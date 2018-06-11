import * as Promise from 'bluebird';
import * as API from 'pxt-cloud';
import { Client } from './client_';
export declare class WorldClient extends Client implements API.WorldAPI {
    connect(uri?: string): Promise<this>;
}
