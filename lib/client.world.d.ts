import * as API from 'pxt-cloud-api';
import { Client } from './client_';
export declare class WorldClient extends Client implements API.WorldAPI {
    protected _debug: any;
    connect(uri?: string): PromiseLike<this>;
}
