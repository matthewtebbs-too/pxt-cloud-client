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

    public setDataSource(name: string, source: API.DataSource): boolean {
        return this._datarepo.setDataSource(name, source);
    }

    public deleteDataSource(name: string): boolean {
        return this._datarepo.deleteDataSource(name);
    }

    public currentlySynced(name: string): Promise<object | undefined> {
        return Promise.resolve(this._datarepo.getData(name));
    }

    public syncDataSource(name: string): PromiseLike<void> {
        const diff = this._datarepo.calcDataDiff(name);

        return diff ? this.syncDataDiff(name, diff) : Promise.resolve();
    }

    public syncDataDiff(name: string, diff: API.DataDiff[]): PromiseLike<void> {
        return diff.length > 0 ? this._promiseEvent(API.Events.WorldSyncDataDiff, { name, diff }) : Promise.resolve();
    }

    protected _onConnect(socket: SocketIOClient.Socket) {
        super._onConnect(socket);

        this._onNotifyReceivedEvent(API.Events.WorldSyncData, socket);
        this._onNotifyReceivedEvent(API.Events.WorldSyncDataDiff, socket);
    }

    protected _notifyEvent(event: string, ...args: any[]) {
        switch (event) {
            case API.Events.WorldSyncData: {
                const { name, data } = args[0];

                if (this._datarepo.isDataSource(name)) {
                    this._datarepo.setData(name, API.DataRepo.decode(data));
                }
                break;
            }

            case API.Events.WorldSyncDataDiff: {
                const { name, diff } = args[0];

                if (this._datarepo.isDataSource(name)) {
                    this._datarepo.applyDataDiff(name, diff);
                }
                break;
            }
        }

        super._notifyEvent(event, ...args);
    }

    protected _onDisconnect(socket: SocketIOClient.Socket) {
        this._offNotifyReceivedEvent(API.Events.WorldSyncData, socket);
        this._offNotifyReceivedEvent(API.Events.WorldSyncDataDiff, socket);
    }
}
