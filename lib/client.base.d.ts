/// <reference types="socket.io-client" />
import * as Promise from 'bluebird';
export declare class Client {
    private _io;
    readonly isConnected: boolean;
    readonly connectedId: string | null;
    protected readonly io: SocketIOClient.Socket | null;
    connect(uri?: string, nsp?: string): Promise<Client>;
    dispose(): void;
    protected _onConnection(io: SocketIOClient.Socket): void;
    protected _onDisconnection(): void;
}
