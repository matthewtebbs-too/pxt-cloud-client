/// <reference types="socket.io-client" />
import * as Promise from 'bluebird';
import { AckCallback, UserData, UsersAPI } from 'pxt-cloud';
import { Client } from './client_';
export declare class UsersClient extends Client implements UsersAPI {
    connect(uri?: string, nsp?: string): Promise<this>;
    selfInfo(cb?: AckCallback<UserData>): boolean;
    addSelf(user: UserData, cb?: AckCallback<boolean>): boolean;
    removeSelf(cb?: AckCallback<boolean>): boolean;
    protected _onConnect(socket: SocketIOClient.Socket): void;
}
