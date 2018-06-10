/// <reference types="socket.io-client" />
/// <reference types="node" />
import * as Promise from 'bluebird';
import { EventEmitter } from 'events';
export declare class Client extends EventEmitter {
    private _socket;
    readonly isConnected: boolean;
    readonly connectedId: string | null;
    protected readonly socket: SocketIOClient.Socket | null;
    connect(uri?: string, nsp?: string): Promise<this>;
    dispose(): void;
    protected _onConnect(socket: SocketIOClient.Socket): void;
    protected _onDisconnect(): void;
}
