/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as API from 'pxt-cloud-api';

import { Client } from './client_';

const debug = require('debug')('pxt-cloud:client:world');

export class WorldClient extends Client implements API.WorldAPI {
    protected _debug: any = debug;

    private _datarepo = new API.DataRepo();

    public async connect(uri?: string) {
        return await super.connect(uri, 'world');
    }

    public async syncDataSources() {
        const tencdata = await this._promiseEvent<Array<API.Tagged<Buffer>>>(API.Events.WorldPullAllData);

        tencdata.forEach(({ name, data /* encdata */ }) => {
            if (this._datarepo.isDataSource(name) && data) {
                this._datarepo.setData(name, API.DataRepo.decode(data));
            }
        });

        return !!tencdata;
    }

    public setDataSource(name: string, source: API.DataSource): boolean {
        return this._datarepo.setDataSource(name, source);
    }

    public deleteDataSource(name: string): boolean {
        return this._datarepo.deleteDataSource(name);
    }

    public async pullAllData() {
        const result: Array<API.Tagged<API.Data>> = [];

        this._datarepo.names.forEach(async (name: string) => {
            const data = await this.pullData(name);

            if (data) {
                result.push({ name, data });
            }
        });

        return result;
    }

    public async pullData(name: string) {
        return this._datarepo.getData(name);
    }

    public async pushAllData(unlock: boolean = false) {
        const tencdata: Array<API.Tagged<Buffer>> = [];

        this._datarepo.names.forEach(name =>
            tencdata.push({ name, data: API.DataRepo.encode(this._datarepo.getData(name)) }),
        );

        await this._promiseEvent(API.Events.WorldPushAllData, { tencdata, unlock });
    }

    public async pushData(name: string, unlock: boolean = false) {
        const diff = this._datarepo.calcDataDiff(name);

        await this.pushDataDiff(name, diff, unlock);
    }

    public async pushDataDiff(name: string, diff: API.DataDiff[] | undefined, unlock: boolean = false) {
        if (diff && diff.length > 0) {
            await this._promiseEvent(API.Events.WorldPushDataDiff, { name, encdiff: API.DataRepo.encodeArray(diff), unlock });
        } else if (unlock) {
            await this.unlockData(name);
        }
    }

    public async lockData(name: string) {
        return await this._promiseEvent<boolean>(API.Events.WorldLockData, name);
    }

    public async unlockData(name: string) {
        return await this._promiseEvent<boolean>(API.Events.WorldUnlockData, name);
    }

    protected _onConnect(socket: SocketIOClient.Socket) {
        super._onConnect(socket);

        this._onNotifyReceivedEvent(API.Events.WorldPushAllData, socket);
        this._onNotifyReceivedEvent(API.Events.WorldPushData, socket);
        this._onNotifyReceivedEvent(API.Events.WorldPushDataDiff, socket);
    }

    protected _notifyEvent(event: string, ...args: any[]) {
        switch (event) {
            case API.Events.WorldPushData: {
                const { name, encdata } = args[0];

                if (this._datarepo.isDataSource(name)) {
                    this._datarepo.setData(name, API.DataRepo.decode(encdata));
                }
                break;
            }

            case API.Events.WorldPushDataDiff: {
                const { name, encdiff } = args[0];

                if (this._datarepo.isDataSource(name)) {
                    this._datarepo.applyDataDiff(name, API.DataRepo.decode(encdiff), true /* reset recent */);
                }
                break;
            }
        }

        super._notifyEvent(event, ...args);
    }

    protected _onDisconnect(socket: SocketIOClient.Socket) {
        this._offNotifyReceivedEvent(API.Events.WorldPushAllData, socket);
        this._offNotifyReceivedEvent(API.Events.WorldPushData, socket);
        this._offNotifyReceivedEvent(API.Events.WorldPushDataDiff, socket);
    }
}
