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

    public syncDataSource(name: string): PromiseLike<string[]> {
        const diff = this._datarepo.syncDataSource(name);

        return diff ? this.syncDataDiff(name, diff) : Promise.resolve([]);
    }

    public syncDataDiff(name: string, diff: API.DataDiff[]): PromiseLike<string[]> {
        return diff.length > 0 ? this._promiseEvent(API.Events.WorldSyncDataDiff, { name, diff }) : Promise.resolve([]);
    }
}
