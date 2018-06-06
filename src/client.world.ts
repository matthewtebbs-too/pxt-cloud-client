/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import { UserData, UserId, WorldAPI } from 'pxt-cloud';

import { Client } from './client.base';

const debug = require('debug')('pxt-cloud:client.world');

export class WorldClient extends Client implements WorldAPI {
    constructor(uri?: string) {
        super(uri, 'pxt-cloud.world');
    }

    public addUser(user: UserData, id?: UserId): boolean {
        this.io!.emit('user_add', user, id || this.connectedId);
        return true;
    }

    public removeUser(id?: UserId): boolean {
        this.io!.emit('user_remove', id || this.connectedId);
        return true;
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
