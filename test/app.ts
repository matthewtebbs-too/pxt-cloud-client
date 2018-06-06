/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

require('dotenv').config();

import { UserData, UserId, WorldAPI } from 'pxt-cloud';

import * as PxtCloud from '..';

const debug = require('debug')('pxt-cloud:test');

const worldAPI = new PxtCloud.WorldClient();

setTimeout(() => {
    worldAPI.addUser({ name: 'Jilly Bean' }, debug);
    worldAPI.addUser({ name: 'Jilly Bean' }, debug);
}, 2000);
