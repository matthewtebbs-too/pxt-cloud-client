/// <reference types="socket.io-client" />
import * as API from 'pxt-cloud-api';
import { Client } from './client_';
export declare class WorldClient extends Client implements API.WorldAPI {
    protected _debug: any;
    private _datarepo;
    connect(uri?: string): PromiseLike<this>;
    addDataSource(name: string, source_: API.DataSource): boolean;
    removeDataSource(name: string): boolean;
    currentlySynced(name: string): any;
    syncDataSource(name: string): PromiseLike<string[]>;
    syncDataDiff(name: string, diff: API.DataDiff[]): PromiseLike<string[]>;
    protected _onConnect(socket: SocketIOClient.Socket): void;
    protected _notifyEvent(event: string, ...args: any[]): boolean;
    protected _onDisconnect(socket: SocketIOClient.Socket): void;
}
