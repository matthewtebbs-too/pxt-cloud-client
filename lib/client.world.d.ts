/// <reference types="socket.io-client" />
import * as Promise from 'bluebird';
import * as API from 'pxt-cloud-api';
import { Client } from './client_';
export declare class WorldClient extends Client implements API.WorldAPI {
    protected _debug: any;
    private _datarepo;
    connect(uri?: string): PromiseLike<this>;
    addDataSource(name: string, source: API.DataSource): boolean;
    removeDataSource(name: string): boolean;
    currentlySynced(name: string): Promise<object | undefined>;
    syncDataSource(name: string): PromiseLike<void>;
    syncDataDiff(name: string, diff: API.DataDiff[]): PromiseLike<void>;
    protected _onConnect(socket: SocketIOClient.Socket): void;
    protected _notifyEvent(event: string, ...args: any[]): void;
    protected _onDisconnect(socket: SocketIOClient.Socket): void;
}
