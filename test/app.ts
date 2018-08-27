/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

require('dotenv').config();

import * as API from 'pxt-cloud-api';

import * as PxtCloudClient from '..';

const isProducer = process.env.PRODUCE;

const debug = require('debug')(`pxt-cloud:${isProducer ? 'produce' : 'consume'}`);

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

    debug(isProducer ? 'Producing...' : 'Consuming...');

    const data = {
        array: [] as number[],
        next: 0,
    };

    api.setDataSource('globals', { data });

    await api.syncDataSources();

    debug('Start');

    for (;;) {
        if (await api.lockData('globals')) {
            if (isProducer) {
                data.array.push(data.next++);
            } else {
                let value;
                for (;;) {
                    value = data.array.shift();
                    if (undefined === value) {
                        break;
                    }

                    // debug(value);
                }
            }

            await api.pushData('globals');

            await api.unlockData('globals');

            if (1000 < data.next) {
                break;
            }
        } else {
            debug('failed lock globals!');
        }
    }

    debug('Finished');
}

async function test(api: API.PublicAPI) {
    if (!api || !api.users || !api.chat || !api.world) {
        return;
    }

    api.users.addSelf({ name: isProducer ? 'Producer' : 'Consumer' });

    api.users.on(API.Events.UserJoined, async () => await api.chat.newMessage('hi!'));

    api.chat.on(API.Events.ChatNewMessage, args => debug(`${args.name} says '${args.text}'`));

    debug('Waiting 2 seconds to start... :)');

    setTimeout(async () => {
        testUsersAPI(api.users);
        testChatAPI(api.chat);
        testWorldAPI(api.world);
    }, 2000 /* small delay */);
}

PxtCloudClient.makeAPIConnection().then(async api => await test(api), debug);
