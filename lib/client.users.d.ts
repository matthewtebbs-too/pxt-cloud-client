/// <reference types="socket.io-client" />
import * as Promise from 'bluebird';
import * as API from 'pxt-cloud';
import { Client } from './client_';
export declare class UsersClient extends Client implements API.UsersAPI {
    connect(uri?: string, nsp?: string): Promise<this>;
    selfInfo(cb?: API.AckCallback<API.UserData>): boolean;
    selfInfoAsync(): Promise<API.UserData>;
    addSelf(user: API.UserData, cb?: API.AckCallback<boolean>): boolean;
    addSelfAsync(): Promise<boolean>;
    removeSelf(cb?: API.AckCallback<boolean>): boolean;
    removeSelfAsync(): Promise<boolean>;
    protected _onConnect(socket: SocketIOClient.Socket): void;
}
