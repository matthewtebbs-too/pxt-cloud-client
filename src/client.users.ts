/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';
import * as API from 'pxt-cloud';

import { Client } from './client_';

const debug = require('debug')('pxt-cloud:client:users');

const eventSelfInfo = 'self info';
const eventAddSelf = 'add self';
const eventRemoveSelf = 'remove self';
const eventUserJoined = 'user joined';
const eventUserLeft = 'user left';

export class UsersClient extends Client implements API.UsersAPI {
    protected _debug: any = debug;

    public connect(uri?: string): PromiseLike<this> {
        return super.connect(uri, 'users') as Promise<this>;
    }

    public selfInfo(): PromiseLike<API.UserData> {
        return this._promiseEvent(eventSelfInfo);
    }

    public addSelf(user: API.UserData): PromiseLike<boolean> {
        return this._promiseEvent(eventAddSelf, user);
    }

    public removeSelf(): PromiseLike<boolean> {
        return this._promiseEvent(eventRemoveSelf);
    }

    protected _onConnect(socket: SocketIOClient.Socket) {
        super._onConnect(socket);

        this._onNotifyReceivedEvent(eventUserJoined, socket);
        this._onNotifyReceivedEvent(eventUserLeft, socket);
    }

    protected _onDisconnect(socket: SocketIOClient.Socket) {
        this._offNotifyReceivedEvent(eventUserLeft, socket);
        this._offNotifyReceivedEvent(eventUserJoined, socket);
    }
}
