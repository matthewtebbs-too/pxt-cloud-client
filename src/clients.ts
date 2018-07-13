/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

import * as API from 'pxt-cloud-api';

import { ChatClient } from './client.chat';
import { UsersClient } from './client.users';
import { WorldClient } from './client.world';
import { Clients } from './client_';

export * from './client_';
export * from './client.config';
export * from './client.chat';
export * from './client.users';
export * from './client.world';

const debug = require('debug')('pxt-cloud:clients');

export function makeAPIConnection(uri?: string): PromiseLike<API.PublicAPI> {
    const clients: Clients = {
        chat: new ChatClient(),
        users: new UsersClient(),
        world: new WorldClient(),
    };

    return new Promise((resolve, reject) => {
        Promise.all([
            (clients.chat as ChatClient).connect(uri),
            (clients.users as UsersClient).connect(uri),
            (clients.world as WorldClient).connect(uri),
        ])
        .then(([ chat, users, world ]) => {
            const api = { chat, users, world };

            // tslint:disable-next-line:no-string-literal
            api['dispose'] = () => Object.keys(clients).forEach(name => clients[name].dispose());

            resolve(api);
        })
        .catch(reject);
    });
}

export function disposeAPIConnection(api: API.PublicAPI) {
    // tslint:disable-next-line:no-string-literal
    const dispose = api['dispose'];

    if (undefined !== dispose && typeof dispose === 'function') {
        dispose();
    }
}
