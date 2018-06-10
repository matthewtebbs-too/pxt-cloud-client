/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';
import { WorldAPI } from 'pxt-cloud';

import { Client } from './client_';

const debug = require('debug')('pxt-cloud:client.world');

export class WorldClient extends Client implements WorldAPI {
    public connect(uri?: string, nsp?: string): Promise<this> {
        return super.connect(uri, nsp || 'pxt-cloud.world') as Promise<this>;
    }
}
