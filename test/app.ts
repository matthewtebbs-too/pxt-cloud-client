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
    api.addUser({ name: 'Jilly Bean' }, debug);
    api.addUser({ name: 'Polly Anna' }, debug);
    api.removeUser(debug);
}

function testWorldAPI(api: WorldAPI) {
    /* no tests */
}

new PxtCloud.ChatClient().connect().then((api: ChatAPI) => testChatAPI(api)).catch(debug);
// new PxtCloud.UsersClient().connect().then((api: UsersAPI) => testUsersAPI(api)).catch(debug);
// new PxtCloud.WorldClient().connect().then((api: WorldAPI) => testWorldAPI(api)).catch(debug);
