/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';

import * as API from 'pxt-cloud-api';

import { Client } from './client_';

const debug = require('debug')('pxt-cloud:client:users');

export class UsersClient extends Client implements API.UsersAPI {
    protected _debug: any = debug;

    public connect(uri?: string): PromiseLike<this> {
        return super.connect(uri, 'users') as Promise<this>;
    }

    public selfInfo(): PromiseLike<API.UserData> {
        return this._promiseEvent(API.Events.UserSelfInfo);
    }

    public addSelf(user: API.UserData): PromiseLike<boolean> {
        return this._promiseEvent(API.Events.UserAddSelf, user);
    }

    public removeSelf(): PromiseLike<boolean> {
        return this._promiseEvent(API.Events.UserRemoveSelf);
    }

    protected _onConnect(socket: SocketIOClient.Socket) {
        super._onConnect(socket);

        this._onNotifyReceivedEvent(API.Events.UserJoined, socket);
        this._onNotifyReceivedEvent(API.Events.UserLeft, socket);
    }

    protected _onDisconnect(socket: SocketIOClient.Socket) {
        this._offNotifyReceivedEvent(API.Events.UserJoined, socket);
        this._offNotifyReceivedEvent(API.Events.UserLeft, socket);
    }
}
