/// <reference types="socket.io-client" />
import { UserData, UserId, WorldAPI } from 'pxt-cloud';
import { Client } from './client.base';
export declare class WorldClient extends Client implements WorldAPI {
    constructor(uri?: string);
    addUser(user: UserData, id?: UserId): boolean;
    removeUser(id?: UserId): boolean;
    protected _attach(io: SocketIOClient.Socket): void;
    protected _detach(): void;
}
