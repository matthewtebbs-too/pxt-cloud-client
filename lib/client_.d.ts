/// <reference types="socket.io-client" />
/// <reference types="node" />
import * as Promise from 'bluebird';
import { EventEmitter } from 'events';
import * as API from 'pxt-cloud';
export declare abstract class Client extends EventEmitter implements API.EventAPI {
    protected static _errorNotConnected: Error;
    protected abstract _debug: any;
    private _socket;
    readonly isConnected: boolean;
    protected readonly socket: SocketIOClient.Socket | null;
    protected readonly connectedId: string | null;
    connect(uri?: string, nsp?: string): Promise<this>;
    dispose(): void;
    protected _onConnect(socket: SocketIOClient.Socket): void;
    protected _promiseEvent<T>(event: string, ...args: any[]): Promise<T>;
    protected _notifyEvent(event: string, ...args: any[]): boolean;
    protected _notifyReceivedEvent(event: string, socket: SocketIOClient.Socket): void;
    protected _onDisconnect(): void;
}
export declare type Clients = {
    [E in keyof API.PublicAPI]: Client & API.PublicAPI[E];
};
