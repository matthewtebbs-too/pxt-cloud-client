/// <reference types="socket.io-client" />
import * as Promise from 'bluebird';
import { AckCallback, UserData, WorldAPI } from 'pxt-cloud';
import { Client } from './client.base';
export declare class WorldClient extends Client implements WorldAPI {
    connect(uri?: string, nsp?: string): Promise<this>;
    addUser(user: UserData, cb?: AckCallback<boolean>): boolean;
    removeUser(cb?: AckCallback<boolean>): boolean;
    protected _onConnection(io: SocketIOClient.Socket): void;
    protected _onDisconnection(): void;
}
