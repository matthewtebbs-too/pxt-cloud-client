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

    public setDataSource(name: string, source: API.DataSource): boolean {
        return this._datarepo.setDataSource(name, source);
    }

    public deleteDataSource(name: string): boolean {
        return this._datarepo.deleteDataSource(name);
    }

    public async pullAllData() {
        const result: API.NamedData[] = [];

        this._datarepo.names.forEach(async (name: string) => {
            const data = await this.pullData(name);
            if (data) {
                result.push({ name, data });
            }
        });

        return result;
    }

    public pullData(name: string): PromiseLike<object | undefined> {
        return Promise.resolve(this._datarepo.getData(name));
    }

    public async pushAllData() {
        this._datarepo.names.forEach(async (name: string) =>
            await this.pushData(name),
        );
    }

    public pushData(name: string): PromiseLike<void> {
        const diff = this._datarepo.calcDataDiff(name);

        return diff ? this.pushDataDiff(name, diff) : Promise.resolve();
    }

    public pushDataDiff(name: string, diff: API.DataDiff[]): PromiseLike<void> {
        return diff.length > 0 ? this._promiseEvent(API.Events.WorldPushDataDiff, { name, diff }) : Promise.resolve();
    }

    protected _onConnect(socket: SocketIOClient.Socket) {
        super._onConnect(socket);

        this._onNotifyReceivedEvent(API.Events.WorldPushData, socket);
        this._onNotifyReceivedEvent(API.Events.WorldPushDataDiff, socket);
    }

    protected _notifyEvent(event: string, ...args: any[]) {
        switch (event) {
            case API.Events.WorldPushData: {
                const { name, data } = args[0];

                if (this._datarepo.isDataSource(name)) {
                    this._datarepo.setData(name, API.DataRepo.decode(data));
                }
                break;
            }

            case API.Events.WorldPushDataDiff: {
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
        this._offNotifyReceivedEvent(API.Events.WorldPushData, socket);
        this._offNotifyReceivedEvent(API.Events.WorldPushDataDiff, socket);
    }
}
