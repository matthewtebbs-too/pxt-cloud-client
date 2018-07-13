import * as API from 'pxt-cloud-api';
export * from './client_';
export * from './client.config';
export * from './client.chat';
export * from './client.users';
export * from './client.world';
export declare function makeAPIConnection(uri?: string): PromiseLike<API.PublicAPI>;
export declare function disposeAPIConnection(api: API.PublicAPI): void;
