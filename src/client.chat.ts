/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';
import * as API from 'pxt-cloud';

import { Client } from './client_';

const debug = require('debug')('pxt-cloud:client.chat');

export class ChatClient extends Client implements API.ChatAPI {
    public connect(uri?: string, nsp?: string): Promise<this> {
        return super.connect(uri, nsp || 'pxt-cloud.chat') as Promise<this>;
    }

    public newMessage(msg: string | API.MessageData, cb?: API.AckCallback<void>): boolean {
        if (!this.socket) {
            return false;
        }

        this.socket.emit('new message', typeof msg === 'object' ? msg : { text: msg }, cb);

        return true;
    }

    public newMessageAsync(msg: string | API.MessageData): Promise<void> {
        return API.promisefy(this, this.newMessage);
    }

    protected _onConnect(socket: SocketIOClient.Socket) {
        super._onConnect(socket);

        socket.on('new message', (msg: API.MessageData) => {
            debug(`user ${'unknown'} sent message '${msg.text}'`);
        });
    }
}
