/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

require('dotenv').config();

import * as PxtCloud from 'pxt-cloud';

import * as PxtCloudClient from '..';

const debug = require('debug')('pxt-cloud:test');

function testUsersAPI(api: PxtCloud.UsersAPI) {
    if (!api.isConnected) {
        return;
    }

    api.addSelf({ name: 'Jilly Bean' }).then(value => debug(`user existed: %d`, value), debug);
    api.selfInfo().then(value => debug(`user: %o`, value), debug);
}

function testChatAPI(api: PxtCloud.ChatAPI) {
    if (!api.isConnected) {
        return;
    }

    api.newMessage('Hello world!').then(debug(`message queued`), debug);
    api.on('new message', msg => debug(`${msg.name} says '${msg.text}'`));
}

function testWorldAPI(api: PxtCloud.WorldAPI) {
    if (!api.isConnected) {
        return;
    }

    /* no API to test */
}

function test(api: PxtCloud.PublicAPI) {
    testUsersAPI(api.users);
    testChatAPI(api.chat);
    testWorldAPI(api.world);
}

PxtCloudClient.makeAPIConnection().then(test, debug);
