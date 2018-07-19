/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as API from 'pxt-cloud-api';

import { Client } from './client_';

const debug = require('debug')('pxt-cloud:client:chat');

export class ChatClient extends Client implements API.ChatAPI {
    protected _debug: any = debug;

    public connect(uri?: string): Promise<this> {
        return super.connect(uri, 'chat') as Promise<this>;
    }

    public newMessage(msg: string | API.MessageData): PromiseLike<boolean> {
        return this._promiseEvent(API.Events.ChatNewMessage, typeof msg !== 'object' ? { text: msg } : msg);
    }

    protected _onConnect(socket: SocketIOClient.Socket) {
        super._onConnect(socket);

        this._onNotifyReceivedEvent(API.Events.ChatNewMessage, socket);
    }

    protected _onDisconnect(socket: SocketIOClient.Socket) {
        this._offNotifyReceivedEvent(API.Events.ChatNewMessage, socket);
    }
}
