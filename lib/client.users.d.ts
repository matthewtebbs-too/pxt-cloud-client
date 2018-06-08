/// <reference types="socket.io-client" />
import * as Promise from 'bluebird';
import { AckCallback, UserData, UsersAPI } from 'pxt-cloud';
import { Client } from './client.base';
export declare class UsersClient extends Client implements UsersAPI {
    connect(uri?: string, nsp?: string): Promise<this>;
    addUser(user: UserData, cb?: AckCallback<boolean>): boolean;
    removeUser(cb?: AckCallback<boolean>): boolean;
    protected _onConnect(socket: SocketIOClient.Socket): void;
}
