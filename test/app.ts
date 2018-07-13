/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

require('dotenv').config();

import * as API from 'pxt-cloud-api';

import * as PxtCloudClient from '..';

const debug = require('debug')('pxt-cloud:test');

function testUsersAPI(api: API.UsersAPI) {
    if (!api.isConnected) {
        return;
    }
}

function testChatAPI(api: API.ChatAPI) {
    if (!api.isConnected) {
        return;
    }
}

function testWorldAPI(api: API.WorldAPI) {
    if (!api.isConnected) {
        return;
    }

    const data = {
        array: [] as number[],
        count: 0,
    };

    api.addDataSource('globals', { data });

    setInterval(() => {
        data.array.push(data.count);
        data.count++;

        api.syncDataSource('globals');

        debug(data);
    }, 1000);
}

function test(api: API.PublicAPI) {
    testUsersAPI(api.users);
    testChatAPI(api.chat);
    testWorldAPI(api.world);
}

PxtCloudClient.makeAPIConnection().then(test, debug);
