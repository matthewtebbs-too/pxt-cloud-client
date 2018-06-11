/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';
import * as API from 'pxt-cloud';

import { Client } from './client_';

const debug = require('debug')('pxt-cloud:client.users');

export class UsersClient extends Client implements API.UsersAPI {
    public connect(uri?: string, nsp?: string): Promise<API.UsersAPI> {
        return super.connect(uri, nsp || 'pxt-cloud.users') as Promise<API.UsersAPI>;
    }

    public selfInfo(): Promise<API.UserData> {
        return this._promisedEvent('self info');
    }

    public addSelf(user: API.UserData): Promise<boolean> {
        return this._promisedEvent('add self', user);
    }

    public removeSelf(): Promise<boolean> {
        return this._promisedEvent('remove self');
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
