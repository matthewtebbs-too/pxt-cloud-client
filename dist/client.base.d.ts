/// <reference types="socket.io-client" />
export declare abstract class Client {
    private _io;
    readonly isConnected: boolean;
    readonly connectedId: string | null;
    protected readonly io: SocketIOClient.Socket | null;
    constructor(uri?: string, nsp?: string);
    attach(io: SocketIOClient.Socket): void;
    detach(): void;
    protected abstract _onConnection(): void;
    protected abstract _onDisconnection(): void;
}
