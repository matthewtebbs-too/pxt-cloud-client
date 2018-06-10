'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var queryString = _interopDefault(require('query-string'));
var bluebird = _interopDefault(require('bluebird'));
var events = _interopDefault(require('events'));
var socket = _interopDefault(require('socket.io-client'));
var debug = _interopDefault(require('debug'));
var pxtCloud = _interopDefault(require('pxt-cloud'));

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

var client_ = createCommonjsModule(function (module, exports) {
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




var debug$$1 = debug('pxt-cloud:client');
var Client = (function (_super) {
    __extends(Client, _super);
    function Client() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._socket = null;
        return _this;
    }
    Object.defineProperty(Client.prototype, "isConnected", {
        get: function () {
            return !!this._socket && this._socket.connected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "connectedId", {
        get: function () {
            return this.isConnected ? "" + this._socket.id : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "socket", {
        get: function () {
            return this._socket;
        },
        enumerable: true,
        configurable: true
    });
    Client.prototype.connect = function (uri, nsp) {
        var _this = this;
        this.dispose();
        return new bluebird(function (resolve, reject) {
            var transports_ = typeof document !== 'undefined' ? ['polling', 'websocket'] : ['websocket'];
            var socket$$1 = socket((uri || client_config_1$1.ClientConfig.defaultUri || '') + "/" + (nsp || ''), { transports: transports_ });
            _this._socket = socket$$1;
            socket$$1.on('connect', function () {
                debug$$1("connected");
                _this._onConnect(socket$$1);
                resolve(_this);
            });
            socket$$1.on('error', function (error) {
                debug$$1(error);
                reject(error);
            });
        });
    };
    Client.prototype.dispose = function () {
        if (this._socket) {
            this._socket.close();
            this._socket = null;
        }
    };
    Client.prototype._onConnect = function (socket$$1) {
        var _this = this;
        socket$$1.on('disconnect', function () {
            debug$$1("disconnected");
            _this._onDisconnect();
        });
    };
    Client.prototype._onDisconnect = function () {
    };
    return Client;
}(events.EventEmitter));
exports.Client = Client;
});

var client_$1 = unwrapExports(client_);
var client__1 = client_.Client;

var client_$2 = /*#__PURE__*/Object.freeze({
	default: client_$1,
	__moduleExports: client_,
	Client: client__1
});

var client_1 = ( client_$2 && client_$1 ) || client_$2;

var client_chat = createCommonjsModule(function (module, exports) {
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


var debug$$1 = debug('pxt-cloud:client.chat');
var ChatClient = (function (_super) {
    __extends(ChatClient, _super);
    function ChatClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChatClient.prototype.connect = function (uri, nsp) {
        return _super.prototype.connect.call(this, uri, nsp || 'pxt-cloud.chat');
    };
    ChatClient.prototype.newMessage = function (msg, cb) {
        if (!this.socket) {
            return false;
        }
        this.socket.emit('new message', typeof msg === 'object' ? msg : { text: msg }, cb);
        return true;
    };
    ChatClient.prototype.newMessageAsync = function (msg) {
        return pxtCloud.promisefy(this, this.newMessage);
    };
    ChatClient.prototype._onConnect = function (socket$$1) {
        _super.prototype._onConnect.call(this, socket$$1);
        socket$$1.on('new message', function (msg) {
            debug$$1("user " + 'unknown' + " sent message '" + msg.text + "'");
        });
    };
    return ChatClient;
}(client_1.Client));
exports.ChatClient = ChatClient;
});

var client_chat$1 = unwrapExports(client_chat);
var client_chat_1 = client_chat.ChatClient;

var client_chat$2 = /*#__PURE__*/Object.freeze({
	default: client_chat$1,
	__moduleExports: client_chat,
	ChatClient: client_chat_1
});

var client_users = createCommonjsModule(function (module, exports) {
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


var debug$$1 = debug('pxt-cloud:client.users');
var UsersClient = (function (_super) {
    __extends(UsersClient, _super);
    function UsersClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UsersClient.prototype.connect = function (uri, nsp) {
        return _super.prototype.connect.call(this, uri, nsp || 'pxt-cloud.users');
    };
    UsersClient.prototype.selfInfo = function (cb) {
        if (!this.socket) {
            return false;
        }
        this.socket.emit('self info', cb);
        return true;
    };
    UsersClient.prototype.selfInfoAsync = function () {
        return pxtCloud.promisefy(this, this.selfInfo);
    };
    UsersClient.prototype.addSelf = function (user, cb) {
        if (!this.socket) {
            return false;
        }
        this.socket.emit('add self', user, cb);
        return true;
    };
    UsersClient.prototype.addSelfAsync = function () {
        return pxtCloud.promisefy(this, this.addSelf);
    };
    UsersClient.prototype.removeSelf = function (cb) {
        if (!this.socket) {
            return false;
        }
        this.socket.emit('remove self', cb);
        return true;
    };
    UsersClient.prototype.removeSelfAsync = function () {
        return pxtCloud.promisefy(this, this.removeSelf);
    };
    UsersClient.prototype._onConnect = function (socket$$1) {
        _super.prototype._onConnect.call(this, socket$$1);
        socket$$1.on('user joined', function (userId, user) {
            debug$$1("user " + userId + " joined as '" + user.name + "'");
        });
        socket$$1.on('user left', function (userId) {
            debug$$1("user " + userId + " left");
        });
    };
    return UsersClient;
}(client_1.Client));
exports.UsersClient = UsersClient;
});

var client_users$1 = unwrapExports(client_users);
var client_users_1 = client_users.UsersClient;

var client_users$2 = /*#__PURE__*/Object.freeze({
	default: client_users$1,
	__moduleExports: client_users,
	UsersClient: client_users_1
});

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
    function WorldClient() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorldClient.prototype.connect = function (uri, nsp) {
        return _super.prototype.connect.call(this, uri, nsp || 'pxt-cloud.world');
    };
    return WorldClient;
}(client_1.Client));
exports.WorldClient = WorldClient;
});

var client_world$1 = unwrapExports(client_world);
var client_world_1 = client_world.WorldClient;

var client_world$2 = /*#__PURE__*/Object.freeze({
	default: client_world$1,
	__moduleExports: client_world,
	WorldClient: client_world_1
});

var require$$1 = ( client_chat$2 && client_chat$1 ) || client_chat$2;

var require$$3 = ( client_users$2 && client_users$1 ) || client_users$2;

var require$$4 = ( client_world$2 && client_world$1 ) || client_world$2;

var clients = createCommonjsModule(function (module, exports) {
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(client_1);
__export(require$$1);
__export(client_config_1$1);
__export(require$$3);
__export(require$$4);
});

var clients$1 = unwrapExports(clients);

var clients$2 = /*#__PURE__*/Object.freeze({
	default: clients$1,
	__moduleExports: clients
});

var require$$0 = ( clients$2 && clients$1 ) || clients$2;

var built = createCommonjsModule(function (module, exports) {
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require$$0);
});

var index = unwrapExports(built);

module.exports = index;
