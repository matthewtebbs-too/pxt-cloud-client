/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';
import * as API from 'pxt-cloud';

import { Client } from './client_';

const debug = require('debug')('pxt-cloud:client:users');

export class UsersClient extends Client implements API.UsersAPI {
    protected _debug: any = debug;

    public connect(uri?: string): PromiseLike<this> {
        return super.connect(uri, 'users') as Promise<this>;
    }

    public selfInfo(): PromiseLike<API.UserData> {
        return this._promiseEvent('self info');
    }

    public addSelf(user: API.UserData): PromiseLike<boolean> {
        return this._promiseEvent('add self', user);
    }

    public removeSelf(): PromiseLike<boolean> {
        return this._promiseEvent('remove self');
    }

    protected _onConnect(socket: SocketIOClient.Socket) {
        super._onConnect(socket);

        this._notifyReceivedEvent('user joined', socket);
        this._notifyReceivedEvent('user left', socket);
    }
}
