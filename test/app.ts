/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

require('dotenv').config();

import { WorldAPI } from 'pxt-cloud';

import * as PxtCloud from '..';

const debug = require('debug')('pxt-cloud:test');

function testWorldAPI(api: WorldAPI) {
    api.addUser({ name: 'Jilly Bean' }, debug);
    api.addUser({ name: 'Jilly Bean' }, debug);
}

new PxtCloud.WorldClient().connect().then((api: WorldAPI) => testWorldAPI(api)).catch(debug);
