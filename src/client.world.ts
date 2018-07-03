/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as Promise from 'bluebird';

import * as API from 'pxt-cloud-api';

import { Client } from './client_';

const debug = require('debug')('pxt-cloud:client:world');

export class WorldClient extends Client implements API.WorldAPI {
    protected _debug: any = debug;

    private _datarepo = new API.DataRepo();

    public connect(uri?: string): PromiseLike<this> {
        return super.connect(uri, 'world') as Promise<this>;
    }

    public addDataSource(name: string, source_: API.DataSource): boolean {
        return this._datarepo.addDataSource(name, source_);
    }

    public removeDataSource(name: string): boolean {
        return this._datarepo.removeDataSource(name);
    }

    public syncData(name: string): PromiseLike<string[]> {
        return this.syncDiff(name, this._datarepo.syncData(name));
    }

    public syncDiff(name: string, diff: any | any[] /* deep-diff's IDiff */): PromiseLike<string[]> {
        return this._promiseEvent(API.Events.WorldSyncDiff, { name, diff });
    }
}
