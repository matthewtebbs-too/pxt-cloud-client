/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';
import * as API from 'pxt-cloud';

import { Client } from './client_';

const debug = require('debug')('pxt-cloud:client.chat');

export class ChatClient extends Client implements API.ChatAPI {
    public connect(uri?: string, nsp?: string): Promise<API.ChatAPI> {
        return super.connect(uri, nsp || 'pxt-cloud.chat') as Promise<API.ChatAPI>;
    }

    public newMessage(msg: string | API.MessageData): Promise<void> {
        return this._promisedEvent('new message', msg);
    }

    protected _onConnect(socket: SocketIOClient.Socket) {
        super._onConnect(socket);

        socket.on('new message', (msg: API.MessageData) => {
            debug(`user '${msg.name || 'unknown'}' says '${msg.text}'`);
        });
    }
}
