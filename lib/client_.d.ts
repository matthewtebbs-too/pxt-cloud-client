/// <reference types="socket.io-client" />
/// <reference types="node" />
import * as Promise from 'bluebird';
import { EventEmitter } from 'events';
import * as API from 'pxt-cloud';
export declare abstract class Client extends EventEmitter implements API.EventAPI {
    protected static _errorInvalidConnection: Error;
    protected abstract _debug: any;
    private _socket;
    readonly isConnected: boolean;
    readonly connectedId: string | null;
    protected readonly socket: SocketIOClient.Socket | null;
    connect(uri?: string, nsp?: string): Promise<API.EventAPI>;
    dispose(): void;
    protected _onConnect(socket: SocketIOClient.Socket): void;
    protected _promiseEvent<T>(event: string, ...args: any[]): Promise<T>;
    protected _notifyEvent(event: string, ...args: any[]): boolean;
    protected _notifyReceivedEvent(event: string, socket: SocketIOClient.Socket): void;
    protected _onDisconnect(): void;
}
