'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var require$$0 = _interopDefault(require('debug'));
var bluebird = _interopDefault(require('bluebird'));
var events = _interopDefault(require('events'));
var socket = _interopDefault(require('socket.io-client'));

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var api = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
});

var api$1 = unwrapExports(api);

var api$2 = /*#__PURE__*/Object.freeze({
	default: api$1,
	__moduleExports: api
});

/**
 * Parses an URI
 *
 * @author Steven Levithan <stevenlevithan.com> (MIT license)
 * @api private
 */

var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

var parts = [
    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
];

var parseuri = function parseuri(str) {
    var src = str,
        b = str.indexOf('['),
        e = str.indexOf(']');

    if (b != -1 && e != -1) {
        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
    }

    var m = re.exec(str || ''),
        uri = {},
        i = 14;

    while (i--) {
        uri[parts[i]] = m[i] || '';
    }

    if (b != -1 && e != -1) {
        uri.source = src;
        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
        uri.ipv6uri = true;
    }

    return uri;
};

var parseuri$1 = /*#__PURE__*/Object.freeze({
	default: parseuri,
	__moduleExports: parseuri
});

var parseuri$2 = ( parseuri$1 && parseuri ) || parseuri$1;

/**
 * Module dependencies.
 */


var debug = require$$0('socket.io-client:url');

/**
 * Module exports.
 */

var url_1 = url;

/**
 * URL parser.
 *
 * @param {String} url
 * @param {Object} An object meant to mimic window.location.
 *                 Defaults to window.location.
 * @api public
 */

function url (uri, loc) {
  var obj = uri;

  // default to window.location
  loc = loc || commonjsGlobal.location;
  if (null == uri) uri = loc.protocol + '//' + loc.host;

  // relative path support
  if ('string' === typeof uri) {
    if ('/' === uri.charAt(0)) {
      if ('/' === uri.charAt(1)) {
        uri = loc.protocol + uri;
      } else {
        uri = loc.host + uri;
      }
    }

    if (!/^(https?|wss?):\/\//.test(uri)) {
      debug('protocol-less url %s', uri);
      if ('undefined' !== typeof loc) {
        uri = loc.protocol + '//' + uri;
      } else {
        uri = 'https://' + uri;
      }
    }

    // parse
    debug('parse %s', uri);
    obj = parseuri$2(uri);
  }

  // make sure we treat `localhost:80` and `localhost` equally
  if (!obj.port) {
    if (/^(http|ws)$/.test(obj.protocol)) {
      obj.port = '80';
    } else if (/^(http|ws)s$/.test(obj.protocol)) {
      obj.port = '443';
    }
  }

  obj.path = obj.path || '/';

  var ipv6 = obj.host.indexOf(':') !== -1;
  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

  // define unique id
  obj.id = obj.protocol + '://' + host + ':' + obj.port;
  // define href
  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));

  return obj;
}

var url$1 = /*#__PURE__*/Object.freeze({
	default: url_1,
	__moduleExports: url_1
});

var client_config = createCommonjsModule(function (module, exports) {
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require$$0('pxt-cloud:client');
var hostname, port;
var enabled;
function isTrue(value) {
    return !!value && null !== value.trim().match(/^(true|1|)$/);
}
var env;
if (typeof localStorage !== 'undefined') {
    env = localStorage;
}
else if (typeof process !== 'undefined' && process.env) {
    env = process.env;
}
if (!!env) {
    hostname = env.PXT_CLOUD_HOSTNAME;
    port = env.PXT_CLOUD_PORT;
    enabled = isTrue(env.PXT_CLOUD_ENABLED);
}
var ClientConfig = (function () {
    function ClientConfig() {
    }
    Object.defineProperty(ClientConfig, "defaultUri", {
        get: function () {
            return "https://" + ClientConfig.hostname + ":" + ClientConfig.port;
        },
        enumerable: true,
        configurable: true
    });
    ClientConfig.hostname = hostname || 'localhost';
    ClientConfig.port = port ? parseInt(port, 10) : 3000;
    ClientConfig.enabled = enabled || false;
    return ClientConfig;
}());
exports.ClientConfig = ClientConfig;
debug("Configuration\n    Host name [PXT_CLOUD_HOSTNAME]: " + ClientConfig.hostname + "\n    Port [PXT_CLOUD_PORT]:          " + ClientConfig.port + "\n    Enabled [PXT_CLOUD_ENABLED]:    " + (ClientConfig.enabled ? 'true' : 'false'));
});

var client_config$1 = unwrapExports(client_config);
var client_config_1 = client_config.ClientConfig;

var client_config$2 = /*#__PURE__*/Object.freeze({
	default: client_config$1,
	__moduleExports: client_config,
	ClientConfig: client_config_1
});

var url$2 = ( url$1 && url_1 ) || url$1;

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





var Client = (function (_super) {
    __extends(Client, _super);
    function Client() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.off = _super.prototype.removeListener;
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
    Object.defineProperty(Client.prototype, "socket", {
        get: function () {
            return this._socket;
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
    Client.prototype.connect = function (uri, nsp) {
        var _this = this;
        this.dispose();
        return new bluebird(function (resolve, reject) {
            if (!client_config_1$1.ClientConfig.enabled) {
                resolve(_this);
                return;
            }
            var options = {
                rejectUnauthorized: false,
                transports: typeof document !== 'undefined' ? ['polling', 'websocket'] : ['websocket'],
            };
            var socket$$1 = socket((uri || client_config_1$1.ClientConfig.defaultUri || '') + "/pxt-cloud" + (nsp ? "/" + nsp : ''), options);
            _this._socket = socket$$1;
            socket$$1.on('connect', function () {
                _this._debug("client connected");
                _this._onConnect(socket$$1);
                resolve(_this);
            });
            socket$$1.on('connect_error', function (error) {
                _this._debug("client connect failed [" + (typeof error === 'string' ? error : error.message) + "]");
            });
            socket$$1.on('reconnecting', function (attempt) {
                _this._debug("client reconnecting with attempt " + attempt);
            });
            socket$$1.on('reconnect_failed', function () {
                _this._debug("lient max retry attempts reached");
            });
            socket$$1.on('error', function (error) {
                _this._debug("client failed [" + (typeof error === 'string' ? error : error.message) + "]");
                reject(error);
            });
        });
    };
    Client.prototype.dispose = function () {
        if (this._socket) {
            var parsed = url$2(this._socket.io.uri);
            var nsp = this._socket.nsp;
            this._socket.close();
            delete socket.managers[parsed.id].nsps[nsp];
            this._socket = null;
        }
    };
    Client.prototype._onConnect = function (socket$$1) {
        var _this = this;
        socket$$1.on('disconnect', function () {
            _this._debug("client disconnected");
            _this._onDisconnect();
        });
    };
    Client.prototype._promiseEvent = function (event) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new bluebird(function (resolve, reject) {
            var _a;
            if (!_this.socket) {
                reject(Client._errorNotConnected);
                return;
            }
            (_a = _this.socket).emit.apply(_a, [event].concat(args, [function (error, reply) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(reply);
                    }
                }]));
        });
    };
    Client.prototype._notifyEvent = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.emit.apply(this, [event].concat(args));
    };
    Client.prototype._notifyReceivedEvent = function (event, socket$$1) {
        var _this = this;
        if (socket$$1) {
            socket$$1.on(event, function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this._notifyEvent.apply(_this, [event].concat(args));
            });
        }
    };
    Client.prototype._onDisconnect = function () {
    };
    Client._errorNotConnected = new Error('No client connection.');
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

var debug = require$$0('pxt-cloud:client:chat');
var ChatClient = (function (_super) {
    __extends(ChatClient, _super);
    function ChatClient() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._debug = debug;
        return _this;
    }
    ChatClient.prototype.connect = function (uri) {
        return _super.prototype.connect.call(this, uri, 'chat');
    };
    ChatClient.prototype.newMessage = function (msg) {
        return this._promiseEvent('new message', typeof msg !== 'object' ? { text: msg } : msg);
    };
    ChatClient.prototype._onConnect = function (socket$$1) {
        _super.prototype._onConnect.call(this, socket$$1);
        this._notifyReceivedEvent('new message', socket$$1);
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

var debug = require$$0('pxt-cloud:client:users');
var UsersClient = (function (_super) {
    __extends(UsersClient, _super);
    function UsersClient() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._debug = debug;
        return _this;
    }
    UsersClient.prototype.connect = function (uri) {
        return _super.prototype.connect.call(this, uri, 'users');
    };
    UsersClient.prototype.selfInfo = function () {
        return this._promiseEvent('self info');
    };
    UsersClient.prototype.addSelf = function (user) {
        return this._promiseEvent('add self', user);
    };
    UsersClient.prototype.removeSelf = function () {
        return this._promiseEvent('remove self');
    };
    UsersClient.prototype._onConnect = function (socket$$1) {
        _super.prototype._onConnect.call(this, socket$$1);
        this._notifyReceivedEvent('user joined', socket$$1);
        this._notifyReceivedEvent('user left', socket$$1);
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

var debug = require$$0('pxt-cloud:client:world');
var WorldClient = (function (_super) {
    __extends(WorldClient, _super);
    function WorldClient() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._debug = debug;
        return _this;
    }
    WorldClient.prototype.connect = function (uri) {
        return _super.prototype.connect.call(this, uri, 'world');
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

var client_chat_1$1 = ( client_chat$2 && client_chat$1 ) || client_chat$2;

var client_users_1$1 = ( client_users$2 && client_users$1 ) || client_users$2;

var client_world_1$1 = ( client_world$2 && client_world$1 ) || client_world$2;

var clients = createCommonjsModule(function (module, exports) {
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });



__export(client_1);
__export(client_chat_1$1);
__export(client_users_1$1);
__export(client_world_1$1);
var debug = require$$0('pxt-cloud:clients');
function makeAPIConnection(uri) {
    var clients = {
        chat: new client_chat_1$1.ChatClient(),
        users: new client_users_1$1.UsersClient(),
        world: new client_world_1$1.WorldClient(),
    };
    return new Promise(function (resolve, reject) {
        Promise.all([
            clients.chat.connect(uri),
            clients.users.connect(uri),
            clients.world.connect(uri),
        ])
            .then(function (_a) {
            var chat = _a[0], users = _a[1], world = _a[2];
            var api = { chat: chat, users: users, world: world };
            api['dispose'] = function () { return Object.keys(clients).forEach(function (name) { return clients[name].dispose(); }); };
            resolve(api);
        })
            .catch(reject);
    });
}
exports.makeAPIConnection = makeAPIConnection;
function disposeAPIConnection(api) {
    var dispose = api['dispose'];
    if (undefined !== dispose && typeof dispose === 'function') {
        dispose();
    }
}
exports.disposeAPIConnection = disposeAPIConnection;
});

var clients$1 = unwrapExports(clients);
var clients_1 = clients.makeAPIConnection;
var clients_2 = clients.disposeAPIConnection;

var clients$2 = /*#__PURE__*/Object.freeze({
	default: clients$1,
	__moduleExports: clients,
	makeAPIConnection: clients_1,
	disposeAPIConnection: clients_2
});

var require$$0$1 = ( api$2 && api$1 ) || api$2;

var require$$1 = ( clients$2 && clients$1 ) || clients$2;

var built = createCommonjsModule(function (module, exports) {
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require$$0$1);
__export(require$$1);
});

var index = unwrapExports(built);

module.exports = index;
