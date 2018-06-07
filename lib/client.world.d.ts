/// <reference types="socket.io-client" />
import { AckCallback, UserData, WorldAPI } from 'pxt-cloud';
import { Client } from './client.base';
export declare class WorldClient extends Client implements WorldAPI {
    constructor(uri?: string);
    addUser(user: UserData, cb?: AckCallback<boolean>): boolean;
    removeUser(cb?: AckCallback<boolean>): boolean;
    protected _attach(io: SocketIOClient.Socket): void;
    protected _detach(): void;
}
