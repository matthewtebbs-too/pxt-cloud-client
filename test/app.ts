/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

require('dotenv').config();

import { UserData, UserId, WorldAPI } from 'pxt-cloud';

import * as PxtCloud from '../lib';

const worldAPI = new PxtCloud.WorldClient();

setTimeout(() => {
    worldAPI.addUser({ name: 'Jilly Bean' });
}, 2000);
