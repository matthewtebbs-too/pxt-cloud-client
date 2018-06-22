/// <reference types="socket.io-client" />
import * as API from 'pxt-cloud';
import { Client } from './client_';
export declare class UsersClient extends Client implements API.UsersAPI {
    protected _debug: any;
    connect(uri?: string): PromiseLike<this>;
    selfInfo(): PromiseLike<API.UserData>;
    addSelf(user: API.UserData): PromiseLike<boolean>;
    removeSelf(): PromiseLike<boolean>;
    protected _onConnect(socket: SocketIOClient.Socket): void;
}
