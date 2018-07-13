/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';
import { EventEmitter } from 'events';
import * as SocketIO from 'socket.io-client';
const url = require('socket.io-client/lib/url');

import * as API from 'pxt-cloud-api';

import { ClientConfig } from './client.config';

export abstract class Client extends EventEmitter implements API.CommonAPI {
    protected static _errorNotConnected = new Error('No client connection.');

    public readonly off = super.removeListener;

    protected abstract _debug: any;

    private _socket: SocketIOClient.Socket | null = null;

    public get isConnected(): boolean {
        return !!this._socket && this._socket.connected;
    }

    protected get socket(): SocketIOClient.Socket | null {
        return this._socket;
    }

    protected get connectedId(): string | null {
        return this.isConnected ? `${this._socket!.id}` : null;
    }

    public connect(uri?: string, nsp?: string): PromiseLike<this> {
        this.dispose();

        return new Promise((resolve, reject) => {
            if (!ClientConfig.enabled) {
                resolve();
                return;
            }

            const options: SocketIOClient.ConnectOpts = {
                rejectUnauthorized: false, /* TODO$: use CA issued server certificate */
                transports: typeof document !== 'undefined' ? ['polling', 'websocket'] : ['websocket'],
            };

            const socket = SocketIO(`${uri || ClientConfig.defaultUri || ''}/pxt-cloud${nsp ? `/${nsp}` : ''}`, options);

            this._socket = socket;

            socket.on('connect', () => {
                this._debug(`client connected`);
                this._onConnect(socket);
                resolve(this);
            });

            socket.on('disconnect', () => {
                this._debug(`client disconnected`);
                this._onDisconnect(socket);
            });

            socket.on('connect_error', (error: Error) => {
                this._debug(`client connect failed [${typeof error === 'string' ? error : error.message}]`);
            });

            socket.on('reconnecting', (attempt: number) => {
                this._debug(`client reconnecting with attempt ${attempt}`);
            });

            socket.on('reconnect_failed', () => {
                this._debug(`lient max retry attempts reached`);
            });

            socket.on('error', (error: Error) => {
                this._debug(`client failed [${typeof error === 'string' ? error : error.message}]`);
                reject(error);
            });
        });
    }

    public dispose() {
        if (this._socket) {
            const parsed = url(this._socket.io.uri);
            const nsp = this._socket.nsp;

            this._socket.close();
            this._socket = null;

            delete SocketIO.managers[parsed.id].nsps[nsp];
        }
    }

    protected _onConnect(socket: SocketIOClient.Socket) {
        /* do nothing */
    }

    protected _onDisconnect(socket: SocketIOClient.Socket) {
        /* do nothing */
    }

    protected _promiseEvent<T>(event: string, ...args: any[]): PromiseLike<T> {
        return new Promise((resolve, reject) => {
            if (!this.socket) {
                reject(Client._errorNotConnected);
                return;
            }

            this.socket.emit(
                event,

                ...args,

                (error: Error | null, reply?: T) => {
                    if (!error) {
                        resolve(reply);
                    } else {
                        reject(error);
                    }
                });
        });
    }

    protected _notifyEvent(event: string, ...args: any[]) {
        this.emit(event, ...args);
    }

    protected _onNotifyReceivedEvent(event: string, socket: SocketIOClient.Socket) {
        socket.on(event, (...args: any[]) => this._notifyEvent(event, ...args));
    }

    protected _offNotifyReceivedEvent(event: string, socket: SocketIOClient.Socket) {
        socket.off(event);
    }
}

export type Clients = { [E in keyof API.PublicAPI]: Client & API.PublicAPI[E] };
