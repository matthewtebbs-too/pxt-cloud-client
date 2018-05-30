/// <reference types="socket.io-client" />
import { Client } from './client.base';
export declare class WorldClient extends Client {
    constructor(uri?: string);
    attach(io: SocketIOClient.Socket): void;
    detach(): void;
    protected _onConnection(): void;
    protected _onDisconnection(): void;
}
