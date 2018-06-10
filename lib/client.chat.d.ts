/// <reference types="socket.io-client" />
import * as Promise from 'bluebird';
import { AckCallback, ChatAPI, MessageData } from 'pxt-cloud';
import { Client } from './client_';
export declare class ChatClient extends Client implements ChatAPI {
    connect(uri?: string, nsp?: string): Promise<this>;
    newMessage(msg: string | MessageData, cb?: AckCallback<void>): boolean;
    protected _onConnect(socket: SocketIOClient.Socket): void;
}
