/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';
import { EventEmitter } from 'events';
import * as API from 'pxt-cloud';
import * as SocketIO from 'socket.io-client';

import { ClientConfig } from './client.config';

const debug = require('debug')('pxt-cloud:client');

export class Client extends EventEmitter implements API.EventAPI {
    protected static _errorInvalidConnection = new Error('Invalid client connection!');

    private _socket: SocketIOClient.Socket | null = null;

    public get isConnected(): boolean {
        return !!this._socket && this._socket.connected;
    }

    public get connectedId(): string | null {
        return this.isConnected ? `${this._socket!.id}` : null;
    }

    protected get socket(): SocketIOClient.Socket | null {
        return this._socket;
    }

    public connect(uri?: string, nsp?: string): Promise<API.EventAPI> {
        this.dispose();

        return new Promise((resolve, reject) => {
            const transports_ = typeof document !== 'undefined' ? ['polling', 'websocket'] : ['websocket'];
            const socket = SocketIO(`${uri || ClientConfig.defaultUri || ''}/${nsp || ''}`, { transports: transports_ });

            this._socket = socket;

            socket.on('connect', () => {
                debug(`connected`);

                this._onConnect(socket);
                resolve(this);
            });

            socket.on('error', (error: Error) => {
                debug(error);
                reject(error);
            });
        });
    }

    public dispose() {
        if (this._socket) {
            this._socket.close();
            this._socket = null;
        }
    }

    protected _onConnect(socket: SocketIOClient.Socket) {
        socket.on('disconnect', () => {
            debug(`disconnected`);

            this._onDisconnect();
        });
    }

    protected _promisedEvent<T>(event: string, ...args: any[]): Promise<T> {
        return new Promise((resolve, reject) => {
            if (!this.socket) {
                reject(Client._errorInvalidConnection);
                return;
            }

            this.socket.emit(event, ...args,

                (error: Error | null, reply?: T) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(reply);
                    }
                });
        });
    }

    protected _onDisconnect() {
        /* do nothing */
    }
}
