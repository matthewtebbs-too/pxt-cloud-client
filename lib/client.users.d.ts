/// <reference types="socket.io-client" />
import * as Promise from 'bluebird';
import * as API from 'pxt-cloud';
import { Client } from './client_';
export declare class UsersClient extends Client implements API.UsersAPI {
    connect(uri?: string): Promise<API.UsersAPI>;
    selfInfo(): Promise<API.UserData>;
    addSelf(user: API.UserData): Promise<boolean>;
    removeSelf(): Promise<boolean>;
    protected _onConnect(socket: SocketIOClient.Socket): void;
}
