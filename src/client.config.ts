/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

const debug = require('debug')('pxt-cloud:client');

let hostname: string    = 'localhost',
    port: number        = 3000,
    enabled: boolean    = false;

function isTrue(value: string | undefined): boolean {
    return !!value && null !== value.trim().match(/^(true|1|)$/);
}

let env: any;

if (typeof localStorage !== 'undefined') {
    env = localStorage;
} else if (typeof process !== 'undefined' && process.env) {
    env = process.env;
}

if (!!env) {
    if (env.PXT_CLOUD_HOSTNAME) {
        hostname = env.PXT_CLOUD_HOSTNAME;
    }

    if (env.PXT_CLOUD_PORT) {
        port = parseInt(env.PXT_CLOUD_PORT, 10);
    }

    if (env.PXT_CLOUD_ENABLED) {
        enabled = isTrue(env.PXT_CLOUD_ENABLED);
    }
}

export class ClientConfig {
    public static hostname = hostname;
    public static port = port;
    public static enabled = enabled;

    public static get defaultUri(): string {
        return `https://${ClientConfig.hostname}:${ClientConfig.port}`;
    }
}

debug(
`Configuration
    Host name [PXT_CLOUD_HOSTNAME]: ${ClientConfig.hostname}
    Port [PXT_CLOUD_PORT]:          ${ClientConfig.port}
    Enabled [PXT_CLOUD_ENABLED]:    ${ClientConfig.enabled ? 'true' : 'false'}`);
