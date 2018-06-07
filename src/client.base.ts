/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';
import * as SocketIO from 'socket.io-client';

import { ClientConfig } from './client.config';

const debug = require('debug')('pxt-cloud:client');

export class Client {
    private _io: SocketIOClient.Socket | null = null;

    public get isConnected(): boolean {
        return !!this._io && this._io.connected;
    }

    public get connectedId(): string | null {
        return this.isConnected ? `${this._io!.id}` : null;
    }

    protected get io(): SocketIOClient.Socket | null {
        return this._io;
    }

    public connect(uri?: string, nsp?: string): Promise<this> {
        const transports_ = typeof document !== 'undefined' ? ['polling', 'websocket'] : ['websocket'];

        return new Promise((resolve, reject) => {
            const io = SocketIO(`${uri || ClientConfig.defaultUri || ''}/${nsp || ''}`, { transports: transports_ });

            io.on('connect', () => {
                this._onConnection(io);

                debug(`connected`);
                resolve(this);
            });

            io.on('error', (err: Error) => {
                debug(err);
                reject(err);
            });
        });
    }

    public dispose() {
        if (this._io) {
            this._io.close();
            this._io = null;
        }
    }

    protected _onConnection(io: SocketIOClient.Socket) {
        this._onDisconnection();

        this._io = io;

        io.on('disconnect', () => {
            debug(`disconnected`);

            this._onDisconnection();
        });
    }

    protected _onDisconnection() {
        if (this.io) {
            this.io.off('disconnect');
        }

        this._io = null;
    }
}
