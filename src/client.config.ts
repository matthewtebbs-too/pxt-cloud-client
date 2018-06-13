/*
    MIT License

    Copyright (c) 2018 MuddyTummy Software LLC
*/

let hostname: string | undefined,
    port: string| undefined;

if (typeof location !== 'undefined' && location.search) {
    const parsedQueryString = require('query-string').parse(location.search);
    hostname = parsedQueryString.hostname;
    port = parsedQueryString.port;
} else if (typeof process !== 'undefined' && process.env) {
    hostname = process.env.PXT_CLOUD_HOSTNAME;
    port = process.env.PXT_CLOUD_PORT;
}

export class ClientConfig {
    public static hostname = hostname || 'localhost';
    public static port = port ? parseInt(port, 10) : 3000;

    public static get defaultUri(): string {
        return `https://${ClientConfig.hostname}:${ClientConfig.port}`;
    }
}
