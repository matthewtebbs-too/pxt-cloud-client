/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';
import * as API from 'pxt-cloud';

import { Client } from './client_';

const debug = require('debug')('pxt-cloud:client:chat');

export class ChatClient extends Client implements API.ChatAPI {
    protected _debug: any = debug;

    public connect(uri?: string): Promise<this> {
        return super.connect(uri, 'chat') as Promise<this>;
    }

    public newMessage(msg: string | API.MessageData): PromiseLike<void> {
        return this._promiseEvent('new message', typeof msg !== 'object' ? { text: msg } : msg);
    }

    protected _onConnect(socket: SocketIOClient.Socket) {
        super._onConnect(socket);

        this._notifyReceivedEvent('new message', socket);
    }
}
