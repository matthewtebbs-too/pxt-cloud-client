/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';
import { AckCallback, UserData, UserId, UsersAPI } from 'pxt-cloud';

import { Client } from './client.base';

const debug = require('debug')('pxt-cloud:client.users');

export class UsersClient extends Client implements UsersAPI {
    public connect(uri?: string, nsp?: string): Promise<this> {
        return super.connect(uri, nsp || 'pxt-cloud.users') as Promise<this>;
    }

    public selfInfo(cb?: AckCallback<UserData>): boolean {
        this.socket!.emit('self info', cb);

        return true;
    }

    public addSelf(user: UserData, cb?: AckCallback<boolean>): boolean {
        this.socket!.emit('add self', user, cb);

        return true;
    }

    public removeSelf(cb?: AckCallback<boolean>): boolean {
        this.socket!.emit('remove self', cb);

        return true;
    }

    protected _onConnect(socket: SocketIOClient.Socket) {
        super._onConnect(socket);

        socket.on('user joined', (userId: UserId, user: UserData) => {
            debug(`user ${userId} joined as '${user.name}'`);
        });

        socket.on('user left', (userId: UserId) => {
            debug(`user ${userId} left`);
        });
    }
}
