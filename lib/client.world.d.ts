/// <reference types="socket.io-client" />
import * as API from 'pxt-cloud-api';
import { Client } from './client_';
export declare class WorldClient extends Client implements API.WorldAPI {
    protected _debug: any;
    private _datarepo;
    connect(uri?: string): Promise<this>;
    setDataSource(name: string, source: API.DataSource): boolean;
    deleteDataSource(name: string): boolean;
    pullAllData(): Promise<API.NamedData[]>;
    pullData(name: string): PromiseLike<object | undefined>;
    pushAllData(): Promise<void>;
    pushData(name: string): PromiseLike<void>;
    pushDataDiff(name: string, diff: API.DataDiff[]): PromiseLike<void>;
    protected _onConnect(socket: SocketIOClient.Socket): void;
    protected _notifyEvent(event: string, ...args: any[]): void;
    protected _onDisconnect(socket: SocketIOClient.Socket): void;
}
