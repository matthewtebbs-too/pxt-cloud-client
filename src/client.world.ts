/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';
import { AckCallback, UserData, WorldAPI } from 'pxt-cloud';

import { Client } from './client.base';

// tslint:disable
const debug = require('debug')('pxt-cloud:client.world');

export class WorldClient extends Client implements WorldAPI {
    public connect(uri?: string, nsp?: string): Promise<this> {
        return super.connect(uri, nsp || 'pxt-cloud.world') as Promise<this>;
    }

    public addUser(user: UserData, cb?: AckCallback<boolean>): boolean {
        return !!this.socket!.emit('user_add', user, cb);
    }

    public removeUser(cb?: AckCallback<boolean>): boolean {
        return !!this.socket!.emit('user_remove', cb);
    }

    protected _onConnect(socket: SocketIOClient.Socket) {
        super._onConnect(socket);

        socket.on('login', () => {
            debug(`client logged in as ${this.connectedId || 'unknown'}`);
        });
    }
}
