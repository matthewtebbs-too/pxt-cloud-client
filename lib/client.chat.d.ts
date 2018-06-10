/// <reference types="socket.io-client" />
import * as Promise from 'bluebird';
import * as API from 'pxt-cloud';
import { Client } from './client_';
export declare class ChatClient extends Client implements API.ChatAPI {
    connect(uri?: string, nsp?: string): Promise<this>;
    newMessage(msg: string | API.MessageData, cb?: API.AckCallback<void>): boolean;
    newMessageAsync(msg: string | API.MessageData): Promise<void>;
    protected _onConnect(socket: SocketIOClient.Socket): void;
}
