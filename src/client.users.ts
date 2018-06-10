/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';
import * as API from 'pxt-cloud';

import { Client } from './client_';

const debug = require('debug')('pxt-cloud:client.users');

export class UsersClient extends Client implements API.UsersAPI {
    public connect(uri?: string, nsp?: string): Promise<this> {
        return super.connect(uri, nsp || 'pxt-cloud.users') as Promise<this>;
    }

    public selfInfo(cb?: API.AckCallback<API.UserData>): boolean {
        if (!this.socket) {
            return false;
        }

        this.socket.emit('self info', cb);

        return true;
    }

    public selfInfoAsync(): Promise<API.UserData> {
        return API.promisefy(this, this.selfInfo);
    }

    public addSelf(user: API.UserData, cb?: API.AckCallback<boolean>): boolean {
        if (!this.socket) {
            return false;
        }

        this.socket.emit('add self', user, cb);

        return true;
    }

    public addSelfAsync(): Promise<boolean> {
        return API.promisefy(this, this.addSelf);
    }

    public removeSelf(cb?: API.AckCallback<boolean>): boolean {
        if (!this.socket) {
            return false;
        }

        this.socket.emit('remove self', cb);

        return true;
    }

    public removeSelfAsync(): Promise<boolean> {
        return API.promisefy(this, this.removeSelf);
    }

    protected _onConnect(socket: SocketIOClient.Socket) {
        super._onConnect(socket);

        socket.on('user joined', (userId: API.UserId, user: API.UserData) => {
            debug(`user ${userId} joined as '${user.name}'`);
        });

        socket.on('user left', (userId: API.UserId) => {
            debug(`user ${userId} left`);
        });
    }
}
