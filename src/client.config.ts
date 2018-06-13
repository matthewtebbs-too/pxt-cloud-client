/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

const debug = require('debug')('pxt-cloud:client');

let hostname: string | undefined,
    port: string | undefined;

let enabled: boolean | undefined;

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
    hostname = process.env.PXT_CLOUD_HOSTNAME;
    port = process.env.PXT_CLOUD_PORT;
    enabled = isTrue(process.env.PXT_CLOUD_ENABLED);
}

export class ClientConfig {
    public static hostname = hostname || 'localhost';
    public static port = port ? parseInt(port, 10) : 3000;
    public static enabled = enabled || false;

    public static get defaultUri(): string {
        return `https://${ClientConfig.hostname}:${ClientConfig.port}`;
    }
}

debug(
`Configuration
    Host name [PXT_CLOUD_HOSTNAME]: ${ClientConfig.hostname}
    Port [PXT_CLOUD_PORT]:          ${ClientConfig.port}
    Enabled [PXT_CLOUD_ENABLED]:    ${ClientConfig.enabled ? 'true' : 'false'}`);
