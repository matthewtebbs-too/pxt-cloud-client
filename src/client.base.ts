/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as SocketIO from 'socket.io-client';

import { ClientConfig } from './client.config';

const debug = require('debug')('pxt-cloud:client');

export abstract class Client {
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

    constructor(uri?: string, nsp?: string) {
        const transports_ = typeof document !== 'undefined' ? ['polling', 'websocket'] : ['websocket'];

        this.attach(SocketIO(`${uri || ClientConfig.defaultUri || ''}/${nsp || ''}`, { transports: transports_ }));
    }

    public dispose() {
        if (this._io) {
            this._io.close();

            this._io = null;
        }
    }

    public attach(io: SocketIOClient.Socket) {
        this.detach();

        this._io = io;

        io.on('connect', () => {
            debug(`connected`);

            this._onConnection();
        });

        io.on('disconnect', () => {
            debug(`disconnected`);

            this._onDisconnection();
        });
    }

    public detach() {
        if (this.io) {
            this.io.off('disconnect');
        }

        this._io = null;
    }

    protected abstract _onConnection(): void;
    protected abstract _onDisconnection(): void;
}
