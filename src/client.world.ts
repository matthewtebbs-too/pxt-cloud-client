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
    public connect(uri?: string, nsp?: string): Promise<WorldClient> {
        return super.connect(uri, nsp || 'pxt-cloud.world') as Promise<WorldClient>;
    }

    public addUser(user: UserData, cb?: AckCallback<boolean>): boolean {
        return !!this.io!.emit('user_add', user, cb);
    }

    public removeUser(cb?: AckCallback<boolean>): boolean {
        return !!this.io!.emit('user_remove', cb);
    }

    protected _onConnection(io: SocketIOClient.Socket) {
        super._onConnection(io);

        io.on('login', () => {
            debug(`client logged in as ${this.connectedId || 'unknown'}`);
        });
    }

    protected _onDisconnection() {
        if (this.io) {
            this.io.off('login');
        }

        super._onDisconnection();
    }
}
