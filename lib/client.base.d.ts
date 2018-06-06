/// <reference types="socket.io-client" />
export declare class Client {
    private _io;
    readonly isConnected: boolean;
    readonly connectedId: string | null;
    protected readonly io: SocketIOClient.Socket | null;
    constructor(uri?: string, nsp?: string);
    dispose(): void;
    protected _attach(io: SocketIOClient.Socket): void;
    protected _detach(): void;
    protected _onConnection(): void;
    protected _onDisconnection(): void;
}
