import * as Promise from 'bluebird';
import { WorldAPI } from 'pxt-cloud';
import { Client } from './client_';
export declare class WorldClient extends Client implements WorldAPI {
    connect(uri?: string, nsp?: string): Promise<this>;
}
