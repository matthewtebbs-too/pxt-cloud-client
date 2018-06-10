/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

require('dotenv').config();

import { ChatAPI, UsersAPI, WorldAPI } from 'pxt-cloud';

import * as PxtCloud from '..';

const debug = require('debug')('pxt-cloud:test');

function testChatAPI(api: ChatAPI) {
    api.newMessage('hello', debug);
    api.newMessage('there', debug);
}

function testUsersAPI(api: UsersAPI) {
    api.addSelf({ name: 'Jilly Bean' }, debug);
    api.addSelf({ name: 'Polly Anna' }, debug);
    api.selfInfo(debug);
    api.removeSelf(debug);
}

function testWorldAPI(api: WorldAPI) {
    /* no tests */
}

new PxtCloud.UsersClient().connect().then(api => testUsersAPI(api)).catch(debug);
new PxtCloud.ChatClient().connect().then(api => testChatAPI(api)).catch(debug);
new PxtCloud.WorldClient().connect().then(api => testWorldAPI(api)).catch(debug);
