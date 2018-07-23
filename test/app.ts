/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

require('dotenv').config();

import * as API from 'pxt-cloud-api';

import * as PxtCloudClient from '..';

const debug = require('debug')('pxt-cloud:test');

async function testUsersAPI(api: API.UsersAPI) {
    if (!api.isConnected) {
        return;
    }
}

async function testChatAPI(api: API.ChatAPI) {
    if (!api.isConnected) {
        return;
    }
}

async function testWorldAPI(api: API.WorldAPI) {
    if (!api.isConnected) {
        return;
    }

    const data = {
        array: [] as number[],
        count: 0,
    };

    api.setDataSource('globals', { data });

    debug(await api.syncDataSources());

    setInterval(() => {
        debug(data);

        data.array.push(data.count);
        data.count++;

        api.pushData('globals').then(debug, debug);
    }, 1000);
}

async function test(api: API.PublicAPI) {
    testUsersAPI(api.users);
    testChatAPI(api.chat);
    testWorldAPI(api.world);
}

PxtCloudClient.makeAPIConnection().then(async api => await test(api), debug);
