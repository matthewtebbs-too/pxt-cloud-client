/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

require('dotenv').config();

import * as PxtCloud from 'pxt-cloud';

import * as PxtCloudClient from '..';

const debug = require('debug')('pxt-cloud:test');

function testUsersAPI(api: PxtCloud.UsersAPI) {
    api.addSelf({ name: 'Jilly Bean' }).then(value => debug(`user existed: %d`, value), debug);
    api.selfInfo().then(value => debug(`user: %o`, value), debug);
}

function testChatAPI(api: PxtCloud.ChatAPI) {
    api.newMessage('Hello world!').then(debug(`message sent`), debug);
}

function testWorldAPI(api: PxtCloud.WorldAPI) {
    /* no tests */
}

new PxtCloudClient.UsersClient().connect().then(testUsersAPI, debug);
new PxtCloudClient.ChatClient().connect().then(testChatAPI, debug);
new PxtCloudClient.WorldClient().connect().then(testWorldAPI, debug);
