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

    api.addSelf({ name: 'Jilly Bean' }).then(value => debug(`user existed: %d`, value), debug);
    api.selfInfo().then(value => debug(`user: %o`, value), debug);
}

function testChatAPI(api: API.ChatAPI) {
    if (!api.isConnected) {
        return;
    }

    api.newMessage('Hello world!').then(debug(`message queued`), debug);
    api.on(API.Events.ChatNewMessage, msg => debug(`${msg.name} says '${msg.text}'`));
}

function testWorldAPI(api: API.WorldAPI) {
    if (!api.isConnected) {
        return;
    }

    api.on(API.Events.WorldSyncDataDiff, (name, diff) => {
        debug(api.currentlySynced('globals'));
    });
}

function test(api: API.PublicAPI) {
    testUsersAPI(api.users);
    testChatAPI(api.chat);
    testWorldAPI(api.world);
}

PxtCloudClient.makeAPIConnection().then(test, debug);
