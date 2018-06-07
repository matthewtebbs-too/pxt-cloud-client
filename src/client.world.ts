/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import { AckCallback, UserData, WorldAPI } from 'pxt-cloud';

import { Client } from './client.base';

// tslint:disable
const debug = require('debug')('pxt-cloud:client.world');

export class WorldClient extends Client implements WorldAPI {
    constructor(uri?: string) {
        super(uri, 'pxt-cloud.world');
    }

    public addUser(user: UserData, cb?: AckCallback<boolean>): boolean {
        return !!this.io!.emit('user_add', user, cb);
    }

    public removeUser(cb?: AckCallback<boolean>): boolean {
        return !!this.io!.emit('user_remove', cb);
    }

    protected _attach(io: SocketIOClient.Socket) {
        super._attach(io);

        io.on('login', () => {
            debug(`client logged in as ${this.connectedId || 'unknown'}`);
        });
    }

    protected _detach() {
        if (this.io) {
            this.io.off('login');
        }

        super._detach();
    }
}
