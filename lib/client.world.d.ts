/// <reference types="node" />
/// <reference types="socket.io-client" />
import * as API from 'pxt-cloud-api';
import { Client } from './client_';
export declare class WorldClient extends Client implements API.WorldAPI {
    protected _debug: any;
    private _datarepo;
    connect(uri?: string): Promise<this>;
    syncDataSources(): Promise<boolean>;
    setDataSource(name: string, source: API.DataSource): boolean;
    deleteDataSource(name: string): boolean;
    pullAllData(): Promise<API.Tagged<object>[]>;
    pullData(name: string): Promise<Buffer>;
    pushAllData(): Promise<void>;
    pushData(name: string): Promise<void>;
    pushDataDiff(name: string, diff: API.DataDiff[]): Promise<void>;
    protected _onConnect(socket: SocketIOClient.Socket): void;
    protected _notifyEvent(event: string, ...args: any[]): void;
    protected _onDisconnect(socket: SocketIOClient.Socket): void;
}
