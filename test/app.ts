/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

require('dotenv').config();

import * as API from 'pxt-cloud-api';

import * as PxtCloudClient from '..';

const debug = require('debug')('pxt-cloud:test');

const isProducer = process.env.PRODUCE;

debug(isProducer ? 'Producing...' : 'Consuming...')

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

    await api.syncDataSources();

    setInterval(async () => {
        if (isProducer) {
            data.array.push(data.count);
            data.count++;
        } else {
            data.array.shift();
        }

        await api.pushData('globals');
    }, isProducer ? 750 : 1000);
}

async function test(api: API.PublicAPI) {
    testUsersAPI(api.users);
    testChatAPI(api.chat);
    testWorldAPI(api.world);
}

PxtCloudClient.makeAPIConnection().then(async api => await test(api), debug);
