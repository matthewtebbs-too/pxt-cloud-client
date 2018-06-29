import * as API from 'pxt-cloud-api';
import { Client } from './client_';
export declare class WorldClient extends Client implements API.WorldAPI {
    protected _debug: any;
    private _datarepo;
    connect(uri?: string): PromiseLike<this>;
    addDataSource(name: string, source_: API.DataSource): boolean;
    removeDataSource(name: string): boolean;
    syncData(name: string): PromiseLike<string[]>;
    syncDiff(name: string, diff: any | any[]): PromiseLike<string[]>;
}
