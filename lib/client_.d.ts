/// <reference types="socket.io-client" />
/// <reference types="node" />
import { EventEmitter } from 'events';
import * as API from 'pxt-cloud-api';
export declare abstract class Client extends EventEmitter implements API.CommonAPI {
    protected static _errorNotConnected: Error;
    readonly off: (event: string | symbol, listener: (...args: any[]) => void) => this;
    protected abstract _debug: any;
    private _socket;
    readonly isConnected: boolean;
    protected readonly socket: SocketIOClient.Socket | null;
    protected readonly connectedId: string | null;
    connect(uri?: string, nsp?: string): PromiseLike<this>;
    dispose(): void;
    protected _onConnect(socket: SocketIOClient.Socket): void;
    protected _onDisconnect(socket: SocketIOClient.Socket): void;
    protected _promiseEvent<T>(event: string, ...args: any[]): PromiseLike<T>;
    protected _notifyEvent(event: string, ...args: any[]): void;
    protected _onNotifyReceivedEvent(event: string, socket: SocketIOClient.Socket): void;
    protected _offNotifyReceivedEvent(event: string, socket: SocketIOClient.Socket): void;
}
export declare type Clients = {
    [E in keyof API.PublicAPI]: Client & API.PublicAPI[E];
};
