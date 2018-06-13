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

if (typeof location !== 'undefined' && location.search) {
    const parsedQueryString = require('query-string').parse(location.search);
    hostname = parsedQueryString.hostname;
    port = parsedQueryString.port;
    enabled = isTrue(parsedQueryString.cloudenabled);
} else if (typeof process !== 'undefined' && process.env) {
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
    hostname:   ${ClientConfig.hostname}
    port:       ${ClientConfig.port}
    enabled:    ${ClientConfig.enabled ? 'true' : 'false'}`);
