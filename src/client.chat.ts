/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';
import { AckCallback, ChatAPI, MessageData } from 'pxt-cloud';

import { Client } from './client.base';

const debug = require('debug')('pxt-cloud:client.chat');

export class ChatClient extends Client implements ChatAPI {
    public connect(uri?: string, nsp?: string): Promise<this> {
        return super.connect(uri, nsp || 'pxt-cloud.chat') as Promise<this>;
    }

    public newMessage(msg: string | MessageData, cb?: AckCallback<void>): boolean {
        this.socket!.emit('new message', typeof msg === 'object' ? msg : { text: msg }, cb);

        return true;
    }

    protected _onConnect(socket: SocketIOClient.Socket) {
        super._onConnect(socket);

        socket.on('new message', (msg: MessageData) => {
            debug(`user ${'unknown'} sent message '${msg.text}'`);
        });
    }
}
