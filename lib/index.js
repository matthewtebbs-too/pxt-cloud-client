'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var queryString = _interopDefault(require('query-string'));
var socket = _interopDefault(require('socket.io-client'));
var debug = _interopDefault(require('debug'));

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var client_config = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var hostname, port;
if (typeof location !== 'undefined' && location.search) {
    var parsedQueryString = queryString.parse(location.search);
    hostname = parsedQueryString.hostname;
    port = parsedQueryString.port;
}
else if (typeof process !== 'undefined' && process.env) {
    hostname = process.env.PXT_CLOUD_HOSTNAME;
    port = process.env.PXT_CLOUD_PORT;
}
var ClientConfig = (function () {
    function ClientConfig() {
    }
    Object.defineProperty(ClientConfig, "defaultUri", {
        get: function () {
            return "http://" + ClientConfig.hostname + ":" + ClientConfig.port;
        },
        enumerable: true,
        configurable: true
    });
    ClientConfig.hostname = hostname || 'localhost';
    ClientConfig.port = port ? parseInt(port, 10) : 3000;
    return ClientConfig;
}());
exports.ClientConfig = ClientConfig;
});

var client_config$1 = unwrapExports(client_config);
var client_config_1 = client_config.ClientConfig;

var client_config$2 = /*#__PURE__*/Object.freeze({
	default: client_config$1,
	__moduleExports: client_config,
	ClientConfig: client_config_1
});

var client_config_1$1 = ( client_config$2 && client_config$1 ) || client_config$2;

var client_base = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });


var debug$$1 = debug('pxt-cloud:client');
var Client = (function () {
    function Client(uri, nsp) {
        this._io = null;
        var transports_ = typeof document !== 'undefined' ? ['polling', 'websocket'] : ['websocket'];
        this._attach(socket((uri || client_config_1$1.ClientConfig.defaultUri || '') + "/" + (nsp || ''), { transports: transports_ }));
    }
    Object.defineProperty(Client.prototype, "isConnected", {
        get: function () {
            return !!this._io && this._io.connected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "connectedId", {
        get: function () {
            return this.isConnected ? "" + this._io.id : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "io", {
        get: function () {
            return this._io;
        },
        enumerable: true,
        configurable: true
    });
    Client.prototype.dispose = function () {
        if (this._io) {
            this._io.close();
            this._io = null;
        }
    };
    Client.prototype._attach = function (io) {
        var _this = this;
        this._detach();
        this._io = io;
        io.on('connect', function () {
            debug$$1("connected");
            _this._onConnection();
        });
        io.on('disconnect', function () {
            debug$$1("disconnected");
            _this._onDisconnection();
        });
    };
    Client.prototype._detach = function () {
        if (this.io) {
            this.io.off('disconnect');
        }
        this._io = null;
    };
    Client.prototype._onConnection = function () {
    };
    Client.prototype._onDisconnection = function () {
    };
    return Client;
}());
exports.Client = Client;
});

var client_base$1 = unwrapExports(client_base);
var client_base_1 = client_base.Client;

var client_base$2 = /*#__PURE__*/Object.freeze({
	default: client_base$1,
	__moduleExports: client_base,
	Client: client_base_1
});

var client_base_1$1 = ( client_base$2 && client_base$1 ) || client_base$2;

var client_world = createCommonjsModule(function (module, exports) {
var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });

var debug$$1 = debug('pxt-cloud:client.world');
var WorldClient = (function (_super) {
    __extends(WorldClient, _super);
    function WorldClient(uri) {
        return _super.call(this, uri, 'pxt-cloud.world') || this;
    }
    WorldClient.prototype.addUser = function (user, id) {
        this.io.emit('user_add', user, id || this.connectedId, function (confirmation) { return debug$$1(confirmation); });
        return true;
    };
    WorldClient.prototype.removeUser = function (id) {
        this.io.emit('user_remove', id || this.connectedId);
        return true;
    };
    WorldClient.prototype._attach = function (io) {
        var _this = this;
        _super.prototype._attach.call(this, io);
        io.on('login', function () {
            debug$$1("client logged in as " + (_this.connectedId || 'unknown'));
        });
    };
    WorldClient.prototype._detach = function () {
        if (this.io) {
            this.io.off('login');
        }
        _super.prototype._detach.call(this);
    };
    return WorldClient;
}(client_base_1$1.Client));
exports.WorldClient = WorldClient;
});

var client_world$1 = unwrapExports(client_world);
var client_world_1 = client_world.WorldClient;

var client_world$2 = /*#__PURE__*/Object.freeze({
	default: client_world$1,
	__moduleExports: client_world,
	WorldClient: client_world_1
});

var require$$2 = ( client_world$2 && client_world$1 ) || client_world$2;

var built = createCommonjsModule(function (module, exports) {
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(client_base_1$1);
__export(client_config_1$1);
__export(require$$2);
});

var index = unwrapExports(built);

module.exports = index;
