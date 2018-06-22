/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';
import * as API from 'pxt-cloud';

import { Client } from './client_';

const debug = require('debug')('pxt-cloud:client:world');

export class WorldClient extends Client implements API.WorldAPI {
    protected _debug: any = debug;

    public connect(uri?: string): PromiseLike<this> {
        return super.connect(uri, 'world') as Promise<this>;
    }
}
