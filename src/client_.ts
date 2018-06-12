/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';
import { EventEmitter } from 'events';
import * as API from 'pxt-cloud';
import * as SocketIO from 'socket.io-client';

import { ClientConfig } from './client.config';

export abstract class Client extends EventEmitter implements API.EventAPI {
    protected static _errorInvalidConnection = new Error('Invalid client connection!');

    protected abstract _debug: any;

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
            const socket = SocketIO(`${uri || ClientConfig.defaultUri || ''}/pxt-cloud${nsp ? `/${nsp}` : ''}`, { transports: transports_ });

            this._socket = socket;

            socket.on('connect', () => {
                this._debug(`client connected`);
                this._onConnect(socket);
                resolve(this);
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
            this._socket.close();
            this._socket = null;
        }
    }

    protected _onConnect(socket: SocketIOClient.Socket) {
        socket.on('disconnect', () => {
            this._debug(`client disconnected`);
            this._onDisconnect();
        });
    }

    protected _promiseEvent<T>(event: string, ...args: any[]): Promise<T> {
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

    protected _notifyEvent(event: string, ...args: any[]): boolean {
        return this.emit(event, ...args);
    }

    protected _notifyReceivedEvent(event: string, socket: SocketIOClient.Socket) {
        if (socket) {
            socket.on(event, (...args: any[]) => this._notifyEvent(event, ...args));
        }
    }

    protected _onDisconnect() {
        /* do nothing */
    }
}

export type Clients = { [E in keyof API.PublicAPI]: Client & API.PublicAPI[E] };
