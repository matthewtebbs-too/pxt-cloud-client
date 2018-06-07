/// <reference types="socket.io-client" />
import * as Promise from 'bluebird';
export declare class Client {
    private _socket;
    readonly isConnected: boolean;
    readonly connectedId: string | null;
    protected readonly socket: SocketIOClient.Socket | null;
    connect(uri?: string, nsp?: string): Promise<this>;
    dispose(): void;
    protected _onConnect(socket: SocketIOClient.Socket): void;
    protected _onDisconnect(): void;
}
