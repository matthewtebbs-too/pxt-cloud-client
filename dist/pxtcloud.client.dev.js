(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PxtCloudClient = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
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
var API = require("pxt-cloud-api");
var client_1 = require("./client_");
var debug = require('debug')('pxt-cloud:client:chat');
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
        return this._promiseEvent(API.Events.ChatNewMessage, typeof msg !== 'object' ? { text: msg } : msg);
    };
    ChatClient.prototype._onConnect = function (socket) {
        _super.prototype._onConnect.call(this, socket);
        this._onNotifyReceivedEvent(API.Events.ChatNewMessage, socket);
    };
    ChatClient.prototype._onDisconnect = function (socket) {
        this._offNotifyReceivedEvent(API.Events.ChatNewMessage, socket);
    };
    return ChatClient;
}(client_1.Client));
exports.ChatClient = ChatClient;

},{"./client_":5,"debug":19,"pxt-cloud-api":43}],2:[function(require,module,exports){
(function (process){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var debug = require('debug')('pxt-cloud:client');
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

}).call(this,require('_process'))
},{"_process":42,"debug":19}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
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
var API = require("pxt-cloud-api");
var client_1 = require("./client_");
var debug = require('debug')('pxt-cloud:client:users');
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
        return this._promiseEvent(API.Events.UserSelfInfo);
    };
    UsersClient.prototype.addSelf = function (user) {
        return this._promiseEvent(API.Events.UserAddSelf, user);
    };
    UsersClient.prototype.removeSelf = function () {
        return this._promiseEvent(API.Events.UserRemoveSelf);
    };
    UsersClient.prototype._onConnect = function (socket) {
        _super.prototype._onConnect.call(this, socket);
        this._onNotifyReceivedEvent(API.Events.UserJoined, socket);
        this._onNotifyReceivedEvent(API.Events.UserLeft, socket);
    };
    UsersClient.prototype._onDisconnect = function (socket) {
        this._offNotifyReceivedEvent(API.Events.UserJoined, socket);
        this._offNotifyReceivedEvent(API.Events.UserLeft, socket);
    };
    return UsersClient;
}(client_1.Client));
exports.UsersClient = UsersClient;

},{"./client_":5,"debug":19,"pxt-cloud-api":43}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var API = require("pxt-cloud-api");
var client_1 = require("./client_");
var debug = require('debug')('pxt-cloud:client:world');
var WorldClient = (function (_super) {
    __extends(WorldClient, _super);
    function WorldClient() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._debug = debug;
        _this._datarepo = new API.DataRepo();
        return _this;
    }
    WorldClient.prototype.connect = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, _super.prototype.connect.call(this, uri, 'world')];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    WorldClient.prototype.syncDataSources = function () {
        return __awaiter(this, void 0, void 0, function () {
            var nameddata;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this._promiseEvent(API.Events.WorldPullAllData)];
                    case 1:
                        nameddata = _a.sent();
                        nameddata.forEach(function (_a) {
                            var name = _a.name, data = _a.data;
                            if (_this._datarepo.isDataSource(name)) {
                                _this._datarepo.setData(name, API.DataRepo.decode(data));
                            }
                        });
                        return [2, !!nameddata];
                }
            });
        });
    };
    WorldClient.prototype.setDataSource = function (name, source) {
        return this._datarepo.setDataSource(name, source);
    };
    WorldClient.prototype.deleteDataSource = function (name) {
        return this._datarepo.deleteDataSource(name);
    };
    WorldClient.prototype.pullAllData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            var _this = this;
            return __generator(this, function (_a) {
                result = [];
                this._datarepo.names.forEach(function (name) { return __awaiter(_this, void 0, void 0, function () {
                    var data;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, this.pullData(name)];
                            case 1:
                                data = _a.sent();
                                if (data) {
                                    result.push({ name: name, data: data });
                                }
                                return [2];
                        }
                    });
                }); });
                return [2, result];
            });
        });
    };
    WorldClient.prototype.pullData = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, API.DataRepo.encode(this._datarepo.getData(name))];
            });
        });
    };
    WorldClient.prototype.pushAllData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this._datarepo.names.forEach(function (name) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, this.pushData(name)];
                        case 1: return [2, _a.sent()];
                    }
                }); }); });
                return [2];
            });
        });
    };
    WorldClient.prototype.pushData = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var diff;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        diff = this._datarepo.calcDataDiff(name);
                        if (!diff) return [3, 2];
                        return [4, this.pushDataDiff(name, diff)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    WorldClient.prototype.pushDataDiff = function (name, diff) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(diff.length > 0)) return [3, 2];
                        return [4, this._promiseEvent(API.Events.WorldPushDataDiff, { name: name, diff: diff })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    WorldClient.prototype._onConnect = function (socket) {
        _super.prototype._onConnect.call(this, socket);
        this._onNotifyReceivedEvent(API.Events.WorldPushAllData, socket);
        this._onNotifyReceivedEvent(API.Events.WorldPushData, socket);
        this._onNotifyReceivedEvent(API.Events.WorldPushDataDiff, socket);
    };
    WorldClient.prototype._notifyEvent = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        switch (event) {
            case API.Events.WorldPushData: {
                var _a = args[0], name_1 = _a.name, data = _a.data;
                if (this._datarepo.isDataSource(name_1)) {
                    this._datarepo.setData(name_1, API.DataRepo.decode(data));
                }
                break;
            }
            case API.Events.WorldPushDataDiff: {
                var _b = args[0], name_2 = _b.name, diff = _b.diff;
                if (this._datarepo.isDataSource(name_2)) {
                    this._datarepo.applyDataDiff(name_2, API.DataRepo.decode(diff));
                }
                break;
            }
        }
        _super.prototype._notifyEvent.apply(this, [event].concat(args));
    };
    WorldClient.prototype._onDisconnect = function (socket) {
        this._offNotifyReceivedEvent(API.Events.WorldPushAllData, socket);
        this._offNotifyReceivedEvent(API.Events.WorldPushData, socket);
        this._offNotifyReceivedEvent(API.Events.WorldPushDataDiff, socket);
    };
    return WorldClient;
}(client_1.Client));
exports.WorldClient = WorldClient;

},{"./client_":5,"debug":19,"pxt-cloud-api":43}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
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
var events_1 = require("events");
var SocketIO = require("socket.io-client");
var url = require('socket.io-client/lib/url');
var client_config_1 = require("./client.config");
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
        return new Promise(function (resolve, reject) {
            if (!client_config_1.ClientConfig.enabled) {
                resolve();
                return;
            }
            var options = {
                rejectUnauthorized: false,
                transports: typeof document !== 'undefined' ? ['polling', 'websocket'] : ['websocket'],
            };
            var socket = SocketIO((uri || client_config_1.ClientConfig.defaultUri || '') + "/pxt-cloud" + (nsp ? "/" + nsp : ''), options);
            _this._socket = socket;
            socket.on('connect', function () {
                _this._debug("client connected");
                _this._onConnect(socket);
                resolve(_this);
            });
            socket.on('disconnect', function () {
                _this._debug("client disconnected");
                _this._onDisconnect(socket);
            });
            socket.on('connect_error', function (error) {
                _this._debug("client connect failed [" + (typeof error === 'string' ? error : error.message) + "]");
            });
            socket.on('reconnecting', function (attempt) {
                _this._debug("client reconnecting with attempt " + attempt);
            });
            socket.on('reconnect_failed', function () {
                _this._debug("lient max retry attempts reached");
            });
            socket.on('error', function (error) {
                _this._debug("client failed [" + (typeof error === 'string' ? error : error.message) + "]");
                reject(error);
            });
        });
    };
    Client.prototype.dispose = function () {
        if (this._socket) {
            var parsed = url(this._socket.io.uri);
            var nsp = this._socket.nsp;
            this._socket.close();
            this._socket = null;
            delete SocketIO.managers[parsed.id].nsps[nsp];
        }
    };
    Client.prototype._onConnect = function (socket) {
    };
    Client.prototype._onDisconnect = function (socket) {
    };
    Client.prototype._promiseEvent = function (event) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return new Promise(function (resolve, reject) {
            var _a;
            if (!_this.socket) {
                reject(Client._errorNotConnected);
                return;
            }
            (_a = _this.socket).emit.apply(_a, [event].concat(args, [function (error, reply) {
                    if (!error) {
                        resolve(reply);
                    }
                    else {
                        reject(error);
                    }
                }]));
        });
    };
    Client.prototype._notifyEvent = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.emit.apply(this, [event].concat(args));
    };
    Client.prototype._onNotifyReceivedEvent = function (event, socket) {
        var _this = this;
        socket.on(event, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return _this._notifyEvent.apply(_this, [event].concat(args));
        });
    };
    Client.prototype._offNotifyReceivedEvent = function (event, socket) {
        socket.off(event);
    };
    Client._errorNotConnected = new Error('No client connection.');
    return Client;
}(events_1.EventEmitter));
exports.Client = Client;

},{"./client.config":2,"events":33,"socket.io-client":44,"socket.io-client/lib/url":48}],6:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var client_chat_1 = require("./client.chat");
var client_config_1 = require("./client.config");
var client_users_1 = require("./client.users");
var client_world_1 = require("./client.world");
__export(require("./client_"));
__export(require("./client.config"));
__export(require("./client.chat"));
__export(require("./client.users"));
__export(require("./client.world"));
var debug = require('debug')('pxt-cloud:clients');
function makeAPIConnection(uri) {
    return new Promise(function (resolve, reject) {
        if (!client_config_1.ClientConfig.enabled) {
            resolve();
            return;
        }
        var clients = {
            chat: new client_chat_1.ChatClient(),
            users: new client_users_1.UsersClient(),
            world: new client_world_1.WorldClient(),
        };
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

},{"./client.chat":1,"./client.config":2,"./client.users":3,"./client.world":4,"./client_":5,"debug":19}],7:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./clients"));

},{"./clients":6}],8:[function(require,module,exports){
module.exports = after

function after(count, callback, err_cb) {
    var bail = false
    err_cb = err_cb || noop
    proxy.count = count

    return (count === 0) ? callback() : proxy

    function proxy(err, result) {
        if (proxy.count <= 0) {
            throw new Error('after called too many times')
        }
        --proxy.count

        // after first error, rest are passed to err_cb
        if (err) {
            bail = true
            callback(err)
            // future error callbacks will go to error handler
            callback = err_cb
        } else if (proxy.count === 0 && !bail) {
            callback(null, result)
        }
    }
}

function noop() {}

},{}],9:[function(require,module,exports){
/**
 * An abstraction for slicing an arraybuffer even when
 * ArrayBuffer.prototype.slice is not supported
 *
 * @api public
 */

module.exports = function(arraybuffer, start, end) {
  var bytes = arraybuffer.byteLength;
  start = start || 0;
  end = end || bytes;

  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

  if (start < 0) { start += bytes; }
  if (end < 0) { end += bytes; }
  if (end > bytes) { end = bytes; }

  if (start >= bytes || start >= end || bytes === 0) {
    return new ArrayBuffer(0);
  }

  var abv = new Uint8Array(arraybuffer);
  var result = new Uint8Array(end - start);
  for (var i = start, ii = 0; i < end; i++, ii++) {
    result[ii] = abv[i];
  }
  return result.buffer;
};

},{}],10:[function(require,module,exports){

/**
 * Expose `Backoff`.
 */

module.exports = Backoff;

/**
 * Initialize backoff timer with `opts`.
 *
 * - `min` initial timeout in milliseconds [100]
 * - `max` max timeout [10000]
 * - `jitter` [0]
 * - `factor` [2]
 *
 * @param {Object} opts
 * @api public
 */

function Backoff(opts) {
  opts = opts || {};
  this.ms = opts.min || 100;
  this.max = opts.max || 10000;
  this.factor = opts.factor || 2;
  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
  this.attempts = 0;
}

/**
 * Return the backoff duration.
 *
 * @return {Number}
 * @api public
 */

Backoff.prototype.duration = function(){
  var ms = this.ms * Math.pow(this.factor, this.attempts++);
  if (this.jitter) {
    var rand =  Math.random();
    var deviation = Math.floor(rand * this.jitter * ms);
    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
  }
  return Math.min(ms, this.max) | 0;
};

/**
 * Reset the number of attempts.
 *
 * @api public
 */

Backoff.prototype.reset = function(){
  this.attempts = 0;
};

/**
 * Set the minimum duration
 *
 * @api public
 */

Backoff.prototype.setMin = function(min){
  this.ms = min;
};

/**
 * Set the maximum duration
 *
 * @api public
 */

Backoff.prototype.setMax = function(max){
  this.max = max;
};

/**
 * Set the jitter
 *
 * @api public
 */

Backoff.prototype.setJitter = function(jitter){
  this.jitter = jitter;
};


},{}],11:[function(require,module,exports){
/*
 * base64-arraybuffer
 * https://github.com/niklasvh/base64-arraybuffer
 *
 * Copyright (c) 2012 Niklas von Hertzen
 * Licensed under the MIT license.
 */
(function(){
  "use strict";

  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

  // Use a lookup table to find the index.
  var lookup = new Uint8Array(256);
  for (var i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }

  exports.encode = function(arraybuffer) {
    var bytes = new Uint8Array(arraybuffer),
    i, len = bytes.length, base64 = "";

    for (i = 0; i < len; i+=3) {
      base64 += chars[bytes[i] >> 2];
      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
      base64 += chars[bytes[i + 2] & 63];
    }

    if ((len % 3) === 2) {
      base64 = base64.substring(0, base64.length - 1) + "=";
    } else if (len % 3 === 1) {
      base64 = base64.substring(0, base64.length - 2) + "==";
    }

    return base64;
  };

  exports.decode =  function(base64) {
    var bufferLength = base64.length * 0.75,
    len = base64.length, i, p = 0,
    encoded1, encoded2, encoded3, encoded4;

    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }

    var arraybuffer = new ArrayBuffer(bufferLength),
    bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i+=4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i+1)];
      encoded3 = lookup[base64.charCodeAt(i+2)];
      encoded4 = lookup[base64.charCodeAt(i+3)];

      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
  };
})();

},{}],12:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],13:[function(require,module,exports){
(function (global){
/**
 * Create a blob builder even when vendor prefixes exist
 */

var BlobBuilder = global.BlobBuilder
  || global.WebKitBlobBuilder
  || global.MSBlobBuilder
  || global.MozBlobBuilder;

/**
 * Check if Blob constructor is supported
 */

var blobSupported = (function() {
  try {
    var a = new Blob(['hi']);
    return a.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if Blob constructor supports ArrayBufferViews
 * Fails in Safari 6, so we need to map to ArrayBuffers there.
 */

var blobSupportsArrayBufferView = blobSupported && (function() {
  try {
    var b = new Blob([new Uint8Array([1,2])]);
    return b.size === 2;
  } catch(e) {
    return false;
  }
})();

/**
 * Check if BlobBuilder is supported
 */

var blobBuilderSupported = BlobBuilder
  && BlobBuilder.prototype.append
  && BlobBuilder.prototype.getBlob;

/**
 * Helper function that maps ArrayBufferViews to ArrayBuffers
 * Used by BlobBuilder constructor and old browsers that didn't
 * support it in the Blob constructor.
 */

function mapArrayBufferViews(ary) {
  for (var i = 0; i < ary.length; i++) {
    var chunk = ary[i];
    if (chunk.buffer instanceof ArrayBuffer) {
      var buf = chunk.buffer;

      // if this is a subarray, make a copy so we only
      // include the subarray region from the underlying buffer
      if (chunk.byteLength !== buf.byteLength) {
        var copy = new Uint8Array(chunk.byteLength);
        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
        buf = copy.buffer;
      }

      ary[i] = buf;
    }
  }
}

function BlobBuilderConstructor(ary, options) {
  options = options || {};

  var bb = new BlobBuilder();
  mapArrayBufferViews(ary);

  for (var i = 0; i < ary.length; i++) {
    bb.append(ary[i]);
  }

  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
};

function BlobConstructor(ary, options) {
  mapArrayBufferViews(ary);
  return new Blob(ary, options || {});
};

module.exports = (function() {
  if (blobSupported) {
    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
  } else if (blobBuilderSupported) {
    return BlobBuilderConstructor;
  } else {
    return undefined;
  }
})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],14:[function(require,module,exports){

},{}],15:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  get: function () {
    if (!(this instanceof Buffer)) {
      return undefined
    }
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  get: function () {
    if (!(this instanceof Buffer)) {
      return undefined
    }
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (isArrayBuffer(value) || (value && isArrayBuffer(value.buffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj) {
    if (ArrayBuffer.isView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object.')
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (ArrayBuffer.isView(buf)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isArrayBuffer(string)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : new Buffer(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
// but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
function isArrayBuffer (obj) {
  return obj instanceof ArrayBuffer ||
    (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&
      typeof obj.byteLength === 'number')
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}

},{"base64-js":12,"ieee754":36}],16:[function(require,module,exports){
/**
 * Slice reference.
 */

var slice = [].slice;

/**
 * Bind `obj` to `fn`.
 *
 * @param {Object} obj
 * @param {Function|String} fn or string
 * @return {Function}
 * @api public
 */

module.exports = function(obj, fn){
  if ('string' == typeof fn) fn = obj[fn];
  if ('function' != typeof fn) throw new Error('bind() requires a function');
  var args = slice.call(arguments, 2);
  return function(){
    return fn.apply(obj, args.concat(slice.call(arguments)));
  }
};

},{}],17:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],18:[function(require,module,exports){

module.exports = function(a, b){
  var fn = function(){};
  fn.prototype = b.prototype;
  a.prototype = new fn;
  a.prototype.constructor = a;
};
},{}],19:[function(require,module,exports){
(function (process){
/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // Internet Explorer and Edge do not support colors.
  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}

}).call(this,require('_process'))
},{"./debug":20,"_process":42}],20:[function(require,module,exports){

/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = require('ms');

/**
 * Active `debug` instances.
 */
exports.instances = [];

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  var prevTime;

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);
  debug.destroy = destroy;

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  exports.instances.push(debug);

  return debug;
}

function destroy () {
  var index = exports.instances.indexOf(this);
  if (index !== -1) {
    exports.instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var i;
  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }

  for (i = 0; i < exports.instances.length; i++) {
    var instance = exports.instances[i];
    instance.enabled = exports.enabled(instance.namespace);
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  if (name[name.length - 1] === '*') {
    return true;
  }
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}

},{"ms":39}],21:[function(require,module,exports){

module.exports = require('./socket');

/**
 * Exports parser
 *
 * @api public
 *
 */
module.exports.parser = require('engine.io-parser');

},{"./socket":22,"engine.io-parser":30}],22:[function(require,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var transports = require('./transports/index');
var Emitter = require('component-emitter');
var debug = require('debug')('engine.io-client:socket');
var index = require('indexof');
var parser = require('engine.io-parser');
var parseuri = require('parseuri');
var parseqs = require('parseqs');

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Socket constructor.
 *
 * @param {String|Object} uri or options
 * @param {Object} options
 * @api public
 */

function Socket (uri, opts) {
  if (!(this instanceof Socket)) return new Socket(uri, opts);

  opts = opts || {};

  if (uri && 'object' === typeof uri) {
    opts = uri;
    uri = null;
  }

  if (uri) {
    uri = parseuri(uri);
    opts.hostname = uri.host;
    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
    opts.port = uri.port;
    if (uri.query) opts.query = uri.query;
  } else if (opts.host) {
    opts.hostname = parseuri(opts.host).host;
  }

  this.secure = null != opts.secure ? opts.secure
    : (global.location && 'https:' === location.protocol);

  if (opts.hostname && !opts.port) {
    // if no port is specified manually, use the protocol default
    opts.port = this.secure ? '443' : '80';
  }

  this.agent = opts.agent || false;
  this.hostname = opts.hostname ||
    (global.location ? location.hostname : 'localhost');
  this.port = opts.port || (global.location && location.port
      ? location.port
      : (this.secure ? 443 : 80));
  this.query = opts.query || {};
  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
  this.upgrade = false !== opts.upgrade;
  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
  this.forceJSONP = !!opts.forceJSONP;
  this.jsonp = false !== opts.jsonp;
  this.forceBase64 = !!opts.forceBase64;
  this.enablesXDR = !!opts.enablesXDR;
  this.timestampParam = opts.timestampParam || 't';
  this.timestampRequests = opts.timestampRequests;
  this.transports = opts.transports || ['polling', 'websocket'];
  this.transportOptions = opts.transportOptions || {};
  this.readyState = '';
  this.writeBuffer = [];
  this.prevBufferLen = 0;
  this.policyPort = opts.policyPort || 843;
  this.rememberUpgrade = opts.rememberUpgrade || false;
  this.binaryType = null;
  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
    this.perMessageDeflate.threshold = 1024;
  }

  // SSL options for Node.js client
  this.pfx = opts.pfx || null;
  this.key = opts.key || null;
  this.passphrase = opts.passphrase || null;
  this.cert = opts.cert || null;
  this.ca = opts.ca || null;
  this.ciphers = opts.ciphers || null;
  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
  this.forceNode = !!opts.forceNode;

  // other options for Node.js client
  var freeGlobal = typeof global === 'object' && global;
  if (freeGlobal.global === freeGlobal) {
    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
      this.extraHeaders = opts.extraHeaders;
    }

    if (opts.localAddress) {
      this.localAddress = opts.localAddress;
    }
  }

  // set on handshake
  this.id = null;
  this.upgrades = null;
  this.pingInterval = null;
  this.pingTimeout = null;

  // set on heartbeat
  this.pingIntervalTimer = null;
  this.pingTimeoutTimer = null;

  this.open();
}

Socket.priorWebsocketSuccess = false;

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Protocol version.
 *
 * @api public
 */

Socket.protocol = parser.protocol; // this is an int

/**
 * Expose deps for legacy compatibility
 * and standalone browser access.
 */

Socket.Socket = Socket;
Socket.Transport = require('./transport');
Socket.transports = require('./transports/index');
Socket.parser = require('engine.io-parser');

/**
 * Creates transport of the given type.
 *
 * @param {String} transport name
 * @return {Transport}
 * @api private
 */

Socket.prototype.createTransport = function (name) {
  debug('creating transport "%s"', name);
  var query = clone(this.query);

  // append engine.io protocol identifier
  query.EIO = parser.protocol;

  // transport name
  query.transport = name;

  // per-transport options
  var options = this.transportOptions[name] || {};

  // session id if we already have one
  if (this.id) query.sid = this.id;

  var transport = new transports[name]({
    query: query,
    socket: this,
    agent: options.agent || this.agent,
    hostname: options.hostname || this.hostname,
    port: options.port || this.port,
    secure: options.secure || this.secure,
    path: options.path || this.path,
    forceJSONP: options.forceJSONP || this.forceJSONP,
    jsonp: options.jsonp || this.jsonp,
    forceBase64: options.forceBase64 || this.forceBase64,
    enablesXDR: options.enablesXDR || this.enablesXDR,
    timestampRequests: options.timestampRequests || this.timestampRequests,
    timestampParam: options.timestampParam || this.timestampParam,
    policyPort: options.policyPort || this.policyPort,
    pfx: options.pfx || this.pfx,
    key: options.key || this.key,
    passphrase: options.passphrase || this.passphrase,
    cert: options.cert || this.cert,
    ca: options.ca || this.ca,
    ciphers: options.ciphers || this.ciphers,
    rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
    perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
    extraHeaders: options.extraHeaders || this.extraHeaders,
    forceNode: options.forceNode || this.forceNode,
    localAddress: options.localAddress || this.localAddress,
    requestTimeout: options.requestTimeout || this.requestTimeout,
    protocols: options.protocols || void (0)
  });

  return transport;
};

function clone (obj) {
  var o = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      o[i] = obj[i];
    }
  }
  return o;
}

/**
 * Initializes transport to use and starts probe.
 *
 * @api private
 */
Socket.prototype.open = function () {
  var transport;
  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
    transport = 'websocket';
  } else if (0 === this.transports.length) {
    // Emit error on next tick so it can be listened to
    var self = this;
    setTimeout(function () {
      self.emit('error', 'No transports available');
    }, 0);
    return;
  } else {
    transport = this.transports[0];
  }
  this.readyState = 'opening';

  // Retry with the next transport if the transport is disabled (jsonp: false)
  try {
    transport = this.createTransport(transport);
  } catch (e) {
    this.transports.shift();
    this.open();
    return;
  }

  transport.open();
  this.setTransport(transport);
};

/**
 * Sets the current transport. Disables the existing one (if any).
 *
 * @api private
 */

Socket.prototype.setTransport = function (transport) {
  debug('setting transport %s', transport.name);
  var self = this;

  if (this.transport) {
    debug('clearing existing transport %s', this.transport.name);
    this.transport.removeAllListeners();
  }

  // set up transport
  this.transport = transport;

  // set up transport listeners
  transport
  .on('drain', function () {
    self.onDrain();
  })
  .on('packet', function (packet) {
    self.onPacket(packet);
  })
  .on('error', function (e) {
    self.onError(e);
  })
  .on('close', function () {
    self.onClose('transport close');
  });
};

/**
 * Probes a transport.
 *
 * @param {String} transport name
 * @api private
 */

Socket.prototype.probe = function (name) {
  debug('probing transport "%s"', name);
  var transport = this.createTransport(name, { probe: 1 });
  var failed = false;
  var self = this;

  Socket.priorWebsocketSuccess = false;

  function onTransportOpen () {
    if (self.onlyBinaryUpgrades) {
      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
      failed = failed || upgradeLosesBinary;
    }
    if (failed) return;

    debug('probe transport "%s" opened', name);
    transport.send([{ type: 'ping', data: 'probe' }]);
    transport.once('packet', function (msg) {
      if (failed) return;
      if ('pong' === msg.type && 'probe' === msg.data) {
        debug('probe transport "%s" pong', name);
        self.upgrading = true;
        self.emit('upgrading', transport);
        if (!transport) return;
        Socket.priorWebsocketSuccess = 'websocket' === transport.name;

        debug('pausing current transport "%s"', self.transport.name);
        self.transport.pause(function () {
          if (failed) return;
          if ('closed' === self.readyState) return;
          debug('changing transport and sending upgrade packet');

          cleanup();

          self.setTransport(transport);
          transport.send([{ type: 'upgrade' }]);
          self.emit('upgrade', transport);
          transport = null;
          self.upgrading = false;
          self.flush();
        });
      } else {
        debug('probe transport "%s" failed', name);
        var err = new Error('probe error');
        err.transport = transport.name;
        self.emit('upgradeError', err);
      }
    });
  }

  function freezeTransport () {
    if (failed) return;

    // Any callback called by transport should be ignored since now
    failed = true;

    cleanup();

    transport.close();
    transport = null;
  }

  // Handle any error that happens while probing
  function onerror (err) {
    var error = new Error('probe error: ' + err);
    error.transport = transport.name;

    freezeTransport();

    debug('probe transport "%s" failed because of error: %s', name, err);

    self.emit('upgradeError', error);
  }

  function onTransportClose () {
    onerror('transport closed');
  }

  // When the socket is closed while we're probing
  function onclose () {
    onerror('socket closed');
  }

  // When the socket is upgraded while we're probing
  function onupgrade (to) {
    if (transport && to.name !== transport.name) {
      debug('"%s" works - aborting "%s"', to.name, transport.name);
      freezeTransport();
    }
  }

  // Remove all listeners on the transport and on self
  function cleanup () {
    transport.removeListener('open', onTransportOpen);
    transport.removeListener('error', onerror);
    transport.removeListener('close', onTransportClose);
    self.removeListener('close', onclose);
    self.removeListener('upgrading', onupgrade);
  }

  transport.once('open', onTransportOpen);
  transport.once('error', onerror);
  transport.once('close', onTransportClose);

  this.once('close', onclose);
  this.once('upgrading', onupgrade);

  transport.open();
};

/**
 * Called when connection is deemed open.
 *
 * @api public
 */

Socket.prototype.onOpen = function () {
  debug('socket open');
  this.readyState = 'open';
  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
  this.emit('open');
  this.flush();

  // we check for `readyState` in case an `open`
  // listener already closed the socket
  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
    debug('starting upgrade probes');
    for (var i = 0, l = this.upgrades.length; i < l; i++) {
      this.probe(this.upgrades[i]);
    }
  }
};

/**
 * Handles a packet.
 *
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('opening' === this.readyState || 'open' === this.readyState ||
      'closing' === this.readyState) {
    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

    this.emit('packet', packet);

    // Socket is live - any packet counts
    this.emit('heartbeat');

    switch (packet.type) {
      case 'open':
        this.onHandshake(JSON.parse(packet.data));
        break;

      case 'pong':
        this.setPing();
        this.emit('pong');
        break;

      case 'error':
        var err = new Error('server error');
        err.code = packet.data;
        this.onError(err);
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with socket readyState "%s"', this.readyState);
  }
};

/**
 * Called upon handshake completion.
 *
 * @param {Object} handshake obj
 * @api private
 */

Socket.prototype.onHandshake = function (data) {
  this.emit('handshake', data);
  this.id = data.sid;
  this.transport.query.sid = data.sid;
  this.upgrades = this.filterUpgrades(data.upgrades);
  this.pingInterval = data.pingInterval;
  this.pingTimeout = data.pingTimeout;
  this.onOpen();
  // In case open handler closes socket
  if ('closed' === this.readyState) return;
  this.setPing();

  // Prolong liveness of socket on heartbeat
  this.removeListener('heartbeat', this.onHeartbeat);
  this.on('heartbeat', this.onHeartbeat);
};

/**
 * Resets ping timeout.
 *
 * @api private
 */

Socket.prototype.onHeartbeat = function (timeout) {
  clearTimeout(this.pingTimeoutTimer);
  var self = this;
  self.pingTimeoutTimer = setTimeout(function () {
    if ('closed' === self.readyState) return;
    self.onClose('ping timeout');
  }, timeout || (self.pingInterval + self.pingTimeout));
};

/**
 * Pings server every `this.pingInterval` and expects response
 * within `this.pingTimeout` or closes connection.
 *
 * @api private
 */

Socket.prototype.setPing = function () {
  var self = this;
  clearTimeout(self.pingIntervalTimer);
  self.pingIntervalTimer = setTimeout(function () {
    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
    self.ping();
    self.onHeartbeat(self.pingTimeout);
  }, self.pingInterval);
};

/**
* Sends a ping packet.
*
* @api private
*/

Socket.prototype.ping = function () {
  var self = this;
  this.sendPacket('ping', function () {
    self.emit('ping');
  });
};

/**
 * Called on `drain` event
 *
 * @api private
 */

Socket.prototype.onDrain = function () {
  this.writeBuffer.splice(0, this.prevBufferLen);

  // setting prevBufferLen = 0 is very important
  // for example, when upgrading, upgrade packet is sent over,
  // and a nonzero prevBufferLen could cause problems on `drain`
  this.prevBufferLen = 0;

  if (0 === this.writeBuffer.length) {
    this.emit('drain');
  } else {
    this.flush();
  }
};

/**
 * Flush write buffers.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' !== this.readyState && this.transport.writable &&
    !this.upgrading && this.writeBuffer.length) {
    debug('flushing %d packets in socket', this.writeBuffer.length);
    this.transport.send(this.writeBuffer);
    // keep track of current length of writeBuffer
    // splice writeBuffer and callbackBuffer on `drain`
    this.prevBufferLen = this.writeBuffer.length;
    this.emit('flush');
  }
};

/**
 * Sends a message.
 *
 * @param {String} message.
 * @param {Function} callback function.
 * @param {Object} options.
 * @return {Socket} for chaining.
 * @api public
 */

Socket.prototype.write =
Socket.prototype.send = function (msg, options, fn) {
  this.sendPacket('message', msg, options, fn);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type.
 * @param {String} data.
 * @param {Object} options.
 * @param {Function} callback function.
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, fn) {
  if ('function' === typeof data) {
    fn = data;
    data = undefined;
  }

  if ('function' === typeof options) {
    fn = options;
    options = null;
  }

  if ('closing' === this.readyState || 'closed' === this.readyState) {
    return;
  }

  options = options || {};
  options.compress = false !== options.compress;

  var packet = {
    type: type,
    data: data,
    options: options
  };
  this.emit('packetCreate', packet);
  this.writeBuffer.push(packet);
  if (fn) this.once('flush', fn);
  this.flush();
};

/**
 * Closes the connection.
 *
 * @api private
 */

Socket.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.readyState = 'closing';

    var self = this;

    if (this.writeBuffer.length) {
      this.once('drain', function () {
        if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      });
    } else if (this.upgrading) {
      waitForUpgrade();
    } else {
      close();
    }
  }

  function close () {
    self.onClose('forced close');
    debug('socket closing - telling transport to close');
    self.transport.close();
  }

  function cleanupAndClose () {
    self.removeListener('upgrade', cleanupAndClose);
    self.removeListener('upgradeError', cleanupAndClose);
    close();
  }

  function waitForUpgrade () {
    // wait for upgrade to finish since we can't send packets while pausing a transport
    self.once('upgrade', cleanupAndClose);
    self.once('upgradeError', cleanupAndClose);
  }

  return this;
};

/**
 * Called upon transport error
 *
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('socket error %j', err);
  Socket.priorWebsocketSuccess = false;
  this.emit('error', err);
  this.onClose('transport error', err);
};

/**
 * Called upon transport close.
 *
 * @api private
 */

Socket.prototype.onClose = function (reason, desc) {
  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
    debug('socket close with reason: "%s"', reason);
    var self = this;

    // clear timers
    clearTimeout(this.pingIntervalTimer);
    clearTimeout(this.pingTimeoutTimer);

    // stop event from firing again for transport
    this.transport.removeAllListeners('close');

    // ensure transport won't stay open
    this.transport.close();

    // ignore further transport communication
    this.transport.removeAllListeners();

    // set ready state
    this.readyState = 'closed';

    // clear session id
    this.id = null;

    // emit close event
    this.emit('close', reason, desc);

    // clean buffers after, so users can still
    // grab the buffers on `close` event
    self.writeBuffer = [];
    self.prevBufferLen = 0;
  }
};

/**
 * Filters upgrades, returning only those matching client transports.
 *
 * @param {Array} server upgrades
 * @api private
 *
 */

Socket.prototype.filterUpgrades = function (upgrades) {
  var filteredUpgrades = [];
  for (var i = 0, j = upgrades.length; i < j; i++) {
    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
  }
  return filteredUpgrades;
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./transport":23,"./transports/index":24,"component-emitter":17,"debug":19,"engine.io-parser":30,"indexof":37,"parseqs":40,"parseuri":41}],23:[function(require,module,exports){
/**
 * Module dependencies.
 */

var parser = require('engine.io-parser');
var Emitter = require('component-emitter');

/**
 * Module exports.
 */

module.exports = Transport;

/**
 * Transport abstract constructor.
 *
 * @param {Object} options.
 * @api private
 */

function Transport (opts) {
  this.path = opts.path;
  this.hostname = opts.hostname;
  this.port = opts.port;
  this.secure = opts.secure;
  this.query = opts.query;
  this.timestampParam = opts.timestampParam;
  this.timestampRequests = opts.timestampRequests;
  this.readyState = '';
  this.agent = opts.agent || false;
  this.socket = opts.socket;
  this.enablesXDR = opts.enablesXDR;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;
  this.forceNode = opts.forceNode;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;
  this.localAddress = opts.localAddress;
}

/**
 * Mix in `Emitter`.
 */

Emitter(Transport.prototype);

/**
 * Emits an error.
 *
 * @param {String} str
 * @return {Transport} for chaining
 * @api public
 */

Transport.prototype.onError = function (msg, desc) {
  var err = new Error(msg);
  err.type = 'TransportError';
  err.description = desc;
  this.emit('error', err);
  return this;
};

/**
 * Opens the transport.
 *
 * @api public
 */

Transport.prototype.open = function () {
  if ('closed' === this.readyState || '' === this.readyState) {
    this.readyState = 'opening';
    this.doOpen();
  }

  return this;
};

/**
 * Closes the transport.
 *
 * @api private
 */

Transport.prototype.close = function () {
  if ('opening' === this.readyState || 'open' === this.readyState) {
    this.doClose();
    this.onClose();
  }

  return this;
};

/**
 * Sends multiple packets.
 *
 * @param {Array} packets
 * @api private
 */

Transport.prototype.send = function (packets) {
  if ('open' === this.readyState) {
    this.write(packets);
  } else {
    throw new Error('Transport not open');
  }
};

/**
 * Called upon open
 *
 * @api private
 */

Transport.prototype.onOpen = function () {
  this.readyState = 'open';
  this.writable = true;
  this.emit('open');
};

/**
 * Called with data.
 *
 * @param {String} data
 * @api private
 */

Transport.prototype.onData = function (data) {
  var packet = parser.decodePacket(data, this.socket.binaryType);
  this.onPacket(packet);
};

/**
 * Called with a decoded packet.
 */

Transport.prototype.onPacket = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon close.
 *
 * @api private
 */

Transport.prototype.onClose = function () {
  this.readyState = 'closed';
  this.emit('close');
};

},{"component-emitter":17,"engine.io-parser":30}],24:[function(require,module,exports){
(function (global){
/**
 * Module dependencies
 */

var XMLHttpRequest = require('xmlhttprequest-ssl');
var XHR = require('./polling-xhr');
var JSONP = require('./polling-jsonp');
var websocket = require('./websocket');

/**
 * Export transports.
 */

exports.polling = polling;
exports.websocket = websocket;

/**
 * Polling transport polymorphic constructor.
 * Decides on xhr vs jsonp based on feature detection.
 *
 * @api private
 */

function polling (opts) {
  var xhr;
  var xd = false;
  var xs = false;
  var jsonp = false !== opts.jsonp;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    xd = opts.hostname !== location.hostname || port !== opts.port;
    xs = opts.secure !== isSSL;
  }

  opts.xdomain = xd;
  opts.xscheme = xs;
  xhr = new XMLHttpRequest(opts);

  if ('open' in xhr && !opts.forceJSONP) {
    return new XHR(opts);
  } else {
    if (!jsonp) throw new Error('JSONP disabled');
    return new JSONP(opts);
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polling-jsonp":25,"./polling-xhr":26,"./websocket":28,"xmlhttprequest-ssl":29}],25:[function(require,module,exports){
(function (global){

/**
 * Module requirements.
 */

var Polling = require('./polling');
var inherit = require('component-inherit');

/**
 * Module exports.
 */

module.exports = JSONPPolling;

/**
 * Cached regular expressions.
 */

var rNewline = /\n/g;
var rEscapedNewline = /\\n/g;

/**
 * Global JSONP callbacks.
 */

var callbacks;

/**
 * Noop.
 */

function empty () { }

/**
 * JSONP Polling constructor.
 *
 * @param {Object} opts.
 * @api public
 */

function JSONPPolling (opts) {
  Polling.call(this, opts);

  this.query = this.query || {};

  // define global callbacks array if not present
  // we do this here (lazily) to avoid unneeded global pollution
  if (!callbacks) {
    // we need to consider multiple engines in the same page
    if (!global.___eio) global.___eio = [];
    callbacks = global.___eio;
  }

  // callback identifier
  this.index = callbacks.length;

  // add callback to jsonp global
  var self = this;
  callbacks.push(function (msg) {
    self.onData(msg);
  });

  // append to query string
  this.query.j = this.index;

  // prevent spurious errors from being emitted when the window is unloaded
  if (global.document && global.addEventListener) {
    global.addEventListener('beforeunload', function () {
      if (self.script) self.script.onerror = empty;
    }, false);
  }
}

/**
 * Inherits from Polling.
 */

inherit(JSONPPolling, Polling);

/*
 * JSONP only supports binary as base64 encoded strings
 */

JSONPPolling.prototype.supportsBinary = false;

/**
 * Closes the socket.
 *
 * @api private
 */

JSONPPolling.prototype.doClose = function () {
  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  if (this.form) {
    this.form.parentNode.removeChild(this.form);
    this.form = null;
    this.iframe = null;
  }

  Polling.prototype.doClose.call(this);
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

JSONPPolling.prototype.doPoll = function () {
  var self = this;
  var script = document.createElement('script');

  if (this.script) {
    this.script.parentNode.removeChild(this.script);
    this.script = null;
  }

  script.async = true;
  script.src = this.uri();
  script.onerror = function (e) {
    self.onError('jsonp poll error', e);
  };

  var insertAt = document.getElementsByTagName('script')[0];
  if (insertAt) {
    insertAt.parentNode.insertBefore(script, insertAt);
  } else {
    (document.head || document.body).appendChild(script);
  }
  this.script = script;

  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

  if (isUAgecko) {
    setTimeout(function () {
      var iframe = document.createElement('iframe');
      document.body.appendChild(iframe);
      document.body.removeChild(iframe);
    }, 100);
  }
};

/**
 * Writes with a hidden iframe.
 *
 * @param {String} data to send
 * @param {Function} called upon flush.
 * @api private
 */

JSONPPolling.prototype.doWrite = function (data, fn) {
  var self = this;

  if (!this.form) {
    var form = document.createElement('form');
    var area = document.createElement('textarea');
    var id = this.iframeId = 'eio_iframe_' + this.index;
    var iframe;

    form.className = 'socketio';
    form.style.position = 'absolute';
    form.style.top = '-1000px';
    form.style.left = '-1000px';
    form.target = id;
    form.method = 'POST';
    form.setAttribute('accept-charset', 'utf-8');
    area.name = 'd';
    form.appendChild(area);
    document.body.appendChild(form);

    this.form = form;
    this.area = area;
  }

  this.form.action = this.uri();

  function complete () {
    initIframe();
    fn();
  }

  function initIframe () {
    if (self.iframe) {
      try {
        self.form.removeChild(self.iframe);
      } catch (e) {
        self.onError('jsonp polling iframe removal error', e);
      }
    }

    try {
      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
      iframe = document.createElement(html);
    } catch (e) {
      iframe = document.createElement('iframe');
      iframe.name = self.iframeId;
      iframe.src = 'javascript:0';
    }

    iframe.id = self.iframeId;

    self.form.appendChild(iframe);
    self.iframe = iframe;
  }

  initIframe();

  // escape \n to prevent it from being converted into \r\n by some UAs
  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
  data = data.replace(rEscapedNewline, '\\\n');
  this.area.value = data.replace(rNewline, '\\n');

  try {
    this.form.submit();
  } catch (e) {}

  if (this.iframe.attachEvent) {
    this.iframe.onreadystatechange = function () {
      if (self.iframe.readyState === 'complete') {
        complete();
      }
    };
  } else {
    this.iframe.onload = complete;
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polling":27,"component-inherit":18}],26:[function(require,module,exports){
(function (global){
/**
 * Module requirements.
 */

var XMLHttpRequest = require('xmlhttprequest-ssl');
var Polling = require('./polling');
var Emitter = require('component-emitter');
var inherit = require('component-inherit');
var debug = require('debug')('engine.io-client:polling-xhr');

/**
 * Module exports.
 */

module.exports = XHR;
module.exports.Request = Request;

/**
 * Empty function
 */

function empty () {}

/**
 * XHR Polling constructor.
 *
 * @param {Object} opts
 * @api public
 */

function XHR (opts) {
  Polling.call(this, opts);
  this.requestTimeout = opts.requestTimeout;
  this.extraHeaders = opts.extraHeaders;

  if (global.location) {
    var isSSL = 'https:' === location.protocol;
    var port = location.port;

    // some user agents have empty `location.port`
    if (!port) {
      port = isSSL ? 443 : 80;
    }

    this.xd = opts.hostname !== global.location.hostname ||
      port !== opts.port;
    this.xs = opts.secure !== isSSL;
  }
}

/**
 * Inherits from Polling.
 */

inherit(XHR, Polling);

/**
 * XHR supports binary
 */

XHR.prototype.supportsBinary = true;

/**
 * Creates a request.
 *
 * @param {String} method
 * @api private
 */

XHR.prototype.request = function (opts) {
  opts = opts || {};
  opts.uri = this.uri();
  opts.xd = this.xd;
  opts.xs = this.xs;
  opts.agent = this.agent || false;
  opts.supportsBinary = this.supportsBinary;
  opts.enablesXDR = this.enablesXDR;

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  opts.requestTimeout = this.requestTimeout;

  // other options for Node.js client
  opts.extraHeaders = this.extraHeaders;

  return new Request(opts);
};

/**
 * Sends data.
 *
 * @param {String} data to send.
 * @param {Function} called upon flush.
 * @api private
 */

XHR.prototype.doWrite = function (data, fn) {
  var isBinary = typeof data !== 'string' && data !== undefined;
  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
  var self = this;
  req.on('success', fn);
  req.on('error', function (err) {
    self.onError('xhr post error', err);
  });
  this.sendXhr = req;
};

/**
 * Starts a poll cycle.
 *
 * @api private
 */

XHR.prototype.doPoll = function () {
  debug('xhr poll');
  var req = this.request();
  var self = this;
  req.on('data', function (data) {
    self.onData(data);
  });
  req.on('error', function (err) {
    self.onError('xhr poll error', err);
  });
  this.pollXhr = req;
};

/**
 * Request constructor
 *
 * @param {Object} options
 * @api public
 */

function Request (opts) {
  this.method = opts.method || 'GET';
  this.uri = opts.uri;
  this.xd = !!opts.xd;
  this.xs = !!opts.xs;
  this.async = false !== opts.async;
  this.data = undefined !== opts.data ? opts.data : null;
  this.agent = opts.agent;
  this.isBinary = opts.isBinary;
  this.supportsBinary = opts.supportsBinary;
  this.enablesXDR = opts.enablesXDR;
  this.requestTimeout = opts.requestTimeout;

  // SSL options for Node.js client
  this.pfx = opts.pfx;
  this.key = opts.key;
  this.passphrase = opts.passphrase;
  this.cert = opts.cert;
  this.ca = opts.ca;
  this.ciphers = opts.ciphers;
  this.rejectUnauthorized = opts.rejectUnauthorized;

  // other options for Node.js client
  this.extraHeaders = opts.extraHeaders;

  this.create();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Creates the XHR object and sends the request.
 *
 * @api private
 */

Request.prototype.create = function () {
  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;

  var xhr = this.xhr = new XMLHttpRequest(opts);
  var self = this;

  try {
    debug('xhr open %s: %s', this.method, this.uri);
    xhr.open(this.method, this.uri, this.async);
    try {
      if (this.extraHeaders) {
        xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
        for (var i in this.extraHeaders) {
          if (this.extraHeaders.hasOwnProperty(i)) {
            xhr.setRequestHeader(i, this.extraHeaders[i]);
          }
        }
      }
    } catch (e) {}

    if ('POST' === this.method) {
      try {
        if (this.isBinary) {
          xhr.setRequestHeader('Content-type', 'application/octet-stream');
        } else {
          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        }
      } catch (e) {}
    }

    try {
      xhr.setRequestHeader('Accept', '*/*');
    } catch (e) {}

    // ie6 check
    if ('withCredentials' in xhr) {
      xhr.withCredentials = true;
    }

    if (this.requestTimeout) {
      xhr.timeout = this.requestTimeout;
    }

    if (this.hasXDR()) {
      xhr.onload = function () {
        self.onLoad();
      };
      xhr.onerror = function () {
        self.onError(xhr.responseText);
      };
    } else {
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 2) {
          try {
            var contentType = xhr.getResponseHeader('Content-Type');
            if (self.supportsBinary && contentType === 'application/octet-stream') {
              xhr.responseType = 'arraybuffer';
            }
          } catch (e) {}
        }
        if (4 !== xhr.readyState) return;
        if (200 === xhr.status || 1223 === xhr.status) {
          self.onLoad();
        } else {
          // make sure the `error` event handler that's user-set
          // does not throw in the same tick and gets caught here
          setTimeout(function () {
            self.onError(xhr.status);
          }, 0);
        }
      };
    }

    debug('xhr data %s', this.data);
    xhr.send(this.data);
  } catch (e) {
    // Need to defer since .create() is called directly fhrom the constructor
    // and thus the 'error' event can only be only bound *after* this exception
    // occurs.  Therefore, also, we cannot throw here at all.
    setTimeout(function () {
      self.onError(e);
    }, 0);
    return;
  }

  if (global.document) {
    this.index = Request.requestsCount++;
    Request.requests[this.index] = this;
  }
};

/**
 * Called upon successful response.
 *
 * @api private
 */

Request.prototype.onSuccess = function () {
  this.emit('success');
  this.cleanup();
};

/**
 * Called if we have data.
 *
 * @api private
 */

Request.prototype.onData = function (data) {
  this.emit('data', data);
  this.onSuccess();
};

/**
 * Called upon error.
 *
 * @api private
 */

Request.prototype.onError = function (err) {
  this.emit('error', err);
  this.cleanup(true);
};

/**
 * Cleans up house.
 *
 * @api private
 */

Request.prototype.cleanup = function (fromError) {
  if ('undefined' === typeof this.xhr || null === this.xhr) {
    return;
  }
  // xmlhttprequest
  if (this.hasXDR()) {
    this.xhr.onload = this.xhr.onerror = empty;
  } else {
    this.xhr.onreadystatechange = empty;
  }

  if (fromError) {
    try {
      this.xhr.abort();
    } catch (e) {}
  }

  if (global.document) {
    delete Request.requests[this.index];
  }

  this.xhr = null;
};

/**
 * Called upon load.
 *
 * @api private
 */

Request.prototype.onLoad = function () {
  var data;
  try {
    var contentType;
    try {
      contentType = this.xhr.getResponseHeader('Content-Type');
    } catch (e) {}
    if (contentType === 'application/octet-stream') {
      data = this.xhr.response || this.xhr.responseText;
    } else {
      data = this.xhr.responseText;
    }
  } catch (e) {
    this.onError(e);
  }
  if (null != data) {
    this.onData(data);
  }
};

/**
 * Check if it has XDomainRequest.
 *
 * @api private
 */

Request.prototype.hasXDR = function () {
  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
};

/**
 * Aborts the request.
 *
 * @api public
 */

Request.prototype.abort = function () {
  this.cleanup();
};

/**
 * Aborts pending requests when unloading the window. This is needed to prevent
 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
 * emitted.
 */

Request.requestsCount = 0;
Request.requests = {};

if (global.document) {
  if (global.attachEvent) {
    global.attachEvent('onunload', unloadHandler);
  } else if (global.addEventListener) {
    global.addEventListener('beforeunload', unloadHandler, false);
  }
}

function unloadHandler () {
  for (var i in Request.requests) {
    if (Request.requests.hasOwnProperty(i)) {
      Request.requests[i].abort();
    }
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./polling":27,"component-emitter":17,"component-inherit":18,"debug":19,"xmlhttprequest-ssl":29}],27:[function(require,module,exports){
/**
 * Module dependencies.
 */

var Transport = require('../transport');
var parseqs = require('parseqs');
var parser = require('engine.io-parser');
var inherit = require('component-inherit');
var yeast = require('yeast');
var debug = require('debug')('engine.io-client:polling');

/**
 * Module exports.
 */

module.exports = Polling;

/**
 * Is XHR2 supported?
 */

var hasXHR2 = (function () {
  var XMLHttpRequest = require('xmlhttprequest-ssl');
  var xhr = new XMLHttpRequest({ xdomain: false });
  return null != xhr.responseType;
})();

/**
 * Polling interface.
 *
 * @param {Object} opts
 * @api private
 */

function Polling (opts) {
  var forceBase64 = (opts && opts.forceBase64);
  if (!hasXHR2 || forceBase64) {
    this.supportsBinary = false;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(Polling, Transport);

/**
 * Transport name.
 */

Polling.prototype.name = 'polling';

/**
 * Opens the socket (triggers polling). We write a PING message to determine
 * when the transport is open.
 *
 * @api private
 */

Polling.prototype.doOpen = function () {
  this.poll();
};

/**
 * Pauses polling.
 *
 * @param {Function} callback upon buffers are flushed and transport is paused
 * @api private
 */

Polling.prototype.pause = function (onPause) {
  var self = this;

  this.readyState = 'pausing';

  function pause () {
    debug('paused');
    self.readyState = 'paused';
    onPause();
  }

  if (this.polling || !this.writable) {
    var total = 0;

    if (this.polling) {
      debug('we are currently polling - waiting to pause');
      total++;
      this.once('pollComplete', function () {
        debug('pre-pause polling complete');
        --total || pause();
      });
    }

    if (!this.writable) {
      debug('we are currently writing - waiting to pause');
      total++;
      this.once('drain', function () {
        debug('pre-pause writing complete');
        --total || pause();
      });
    }
  } else {
    pause();
  }
};

/**
 * Starts polling cycle.
 *
 * @api public
 */

Polling.prototype.poll = function () {
  debug('polling');
  this.polling = true;
  this.doPoll();
  this.emit('poll');
};

/**
 * Overloads onData to detect payloads.
 *
 * @api private
 */

Polling.prototype.onData = function (data) {
  var self = this;
  debug('polling got data %s', data);
  var callback = function (packet, index, total) {
    // if its the first message we consider the transport open
    if ('opening' === self.readyState) {
      self.onOpen();
    }

    // if its a close packet, we close the ongoing requests
    if ('close' === packet.type) {
      self.onClose();
      return false;
    }

    // otherwise bypass onData and handle the message
    self.onPacket(packet);
  };

  // decode payload
  parser.decodePayload(data, this.socket.binaryType, callback);

  // if an event did not trigger closing
  if ('closed' !== this.readyState) {
    // if we got data we're not polling
    this.polling = false;
    this.emit('pollComplete');

    if ('open' === this.readyState) {
      this.poll();
    } else {
      debug('ignoring poll - transport state "%s"', this.readyState);
    }
  }
};

/**
 * For polling, send a close packet.
 *
 * @api private
 */

Polling.prototype.doClose = function () {
  var self = this;

  function close () {
    debug('writing close packet');
    self.write([{ type: 'close' }]);
  }

  if ('open' === this.readyState) {
    debug('transport open - closing');
    close();
  } else {
    // in case we're trying to close while
    // handshaking is in progress (GH-164)
    debug('transport not open - deferring close');
    this.once('open', close);
  }
};

/**
 * Writes a packets payload.
 *
 * @param {Array} data packets
 * @param {Function} drain callback
 * @api private
 */

Polling.prototype.write = function (packets) {
  var self = this;
  this.writable = false;
  var callbackfn = function () {
    self.writable = true;
    self.emit('drain');
  };

  parser.encodePayload(packets, this.supportsBinary, function (data) {
    self.doWrite(data, callbackfn);
  });
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

Polling.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'https' : 'http';
  var port = '';

  // cache busting is forced
  if (false !== this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  if (!this.supportsBinary && !query.sid) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // avoid port if default for schema
  if (this.port && (('https' === schema && Number(this.port) !== 443) ||
     ('http' === schema && Number(this.port) !== 80))) {
    port = ':' + this.port;
  }

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

},{"../transport":23,"component-inherit":18,"debug":19,"engine.io-parser":30,"parseqs":40,"xmlhttprequest-ssl":29,"yeast":53}],28:[function(require,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var Transport = require('../transport');
var parser = require('engine.io-parser');
var parseqs = require('parseqs');
var inherit = require('component-inherit');
var yeast = require('yeast');
var debug = require('debug')('engine.io-client:websocket');
var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
var NodeWebSocket;
if (typeof window === 'undefined') {
  try {
    NodeWebSocket = require('ws');
  } catch (e) { }
}

/**
 * Get either the `WebSocket` or `MozWebSocket` globals
 * in the browser or try to resolve WebSocket-compatible
 * interface exposed by `ws` for Node-like environment.
 */

var WebSocket = BrowserWebSocket;
if (!WebSocket && typeof window === 'undefined') {
  WebSocket = NodeWebSocket;
}

/**
 * Module exports.
 */

module.exports = WS;

/**
 * WebSocket transport constructor.
 *
 * @api {Object} connection options
 * @api public
 */

function WS (opts) {
  var forceBase64 = (opts && opts.forceBase64);
  if (forceBase64) {
    this.supportsBinary = false;
  }
  this.perMessageDeflate = opts.perMessageDeflate;
  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
  this.protocols = opts.protocols;
  if (!this.usingBrowserWebSocket) {
    WebSocket = NodeWebSocket;
  }
  Transport.call(this, opts);
}

/**
 * Inherits from Transport.
 */

inherit(WS, Transport);

/**
 * Transport name.
 *
 * @api public
 */

WS.prototype.name = 'websocket';

/*
 * WebSockets support binary
 */

WS.prototype.supportsBinary = true;

/**
 * Opens socket.
 *
 * @api private
 */

WS.prototype.doOpen = function () {
  if (!this.check()) {
    // let probe timeout
    return;
  }

  var uri = this.uri();
  var protocols = this.protocols;
  var opts = {
    agent: this.agent,
    perMessageDeflate: this.perMessageDeflate
  };

  // SSL options for Node.js client
  opts.pfx = this.pfx;
  opts.key = this.key;
  opts.passphrase = this.passphrase;
  opts.cert = this.cert;
  opts.ca = this.ca;
  opts.ciphers = this.ciphers;
  opts.rejectUnauthorized = this.rejectUnauthorized;
  if (this.extraHeaders) {
    opts.headers = this.extraHeaders;
  }
  if (this.localAddress) {
    opts.localAddress = this.localAddress;
  }

  try {
    this.ws = this.usingBrowserWebSocket ? (protocols ? new WebSocket(uri, protocols) : new WebSocket(uri)) : new WebSocket(uri, protocols, opts);
  } catch (err) {
    return this.emit('error', err);
  }

  if (this.ws.binaryType === undefined) {
    this.supportsBinary = false;
  }

  if (this.ws.supports && this.ws.supports.binary) {
    this.supportsBinary = true;
    this.ws.binaryType = 'nodebuffer';
  } else {
    this.ws.binaryType = 'arraybuffer';
  }

  this.addEventListeners();
};

/**
 * Adds event listeners to the socket
 *
 * @api private
 */

WS.prototype.addEventListeners = function () {
  var self = this;

  this.ws.onopen = function () {
    self.onOpen();
  };
  this.ws.onclose = function () {
    self.onClose();
  };
  this.ws.onmessage = function (ev) {
    self.onData(ev.data);
  };
  this.ws.onerror = function (e) {
    self.onError('websocket error', e);
  };
};

/**
 * Writes data to socket.
 *
 * @param {Array} array of packets.
 * @api private
 */

WS.prototype.write = function (packets) {
  var self = this;
  this.writable = false;

  // encodePacket efficient as it uses WS framing
  // no need for encodePayload
  var total = packets.length;
  for (var i = 0, l = total; i < l; i++) {
    (function (packet) {
      parser.encodePacket(packet, self.supportsBinary, function (data) {
        if (!self.usingBrowserWebSocket) {
          // always create a new object (GH-437)
          var opts = {};
          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (self.perMessageDeflate) {
            var len = 'string' === typeof data ? global.Buffer.byteLength(data) : data.length;
            if (len < self.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }
        }

        // Sometimes the websocket has already been closed but the browser didn't
        // have a chance of informing us about it yet, in that case send will
        // throw an error
        try {
          if (self.usingBrowserWebSocket) {
            // TypeError is thrown when passing the second argument on Safari
            self.ws.send(data);
          } else {
            self.ws.send(data, opts);
          }
        } catch (e) {
          debug('websocket closed before onclose event');
        }

        --total || done();
      });
    })(packets[i]);
  }

  function done () {
    self.emit('flush');

    // fake drain
    // defer to next tick to allow Socket to clear writeBuffer
    setTimeout(function () {
      self.writable = true;
      self.emit('drain');
    }, 0);
  }
};

/**
 * Called upon close
 *
 * @api private
 */

WS.prototype.onClose = function () {
  Transport.prototype.onClose.call(this);
};

/**
 * Closes socket.
 *
 * @api private
 */

WS.prototype.doClose = function () {
  if (typeof this.ws !== 'undefined') {
    this.ws.close();
  }
};

/**
 * Generates uri for connection.
 *
 * @api private
 */

WS.prototype.uri = function () {
  var query = this.query || {};
  var schema = this.secure ? 'wss' : 'ws';
  var port = '';

  // avoid port if default for schema
  if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
    ('ws' === schema && Number(this.port) !== 80))) {
    port = ':' + this.port;
  }

  // append timestamp to URI
  if (this.timestampRequests) {
    query[this.timestampParam] = yeast();
  }

  // communicate binary support capabilities
  if (!this.supportsBinary) {
    query.b64 = 1;
  }

  query = parseqs.encode(query);

  // prepend ? to query
  if (query.length) {
    query = '?' + query;
  }

  var ipv6 = this.hostname.indexOf(':') !== -1;
  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
};

/**
 * Feature detection for WebSocket.
 *
 * @return {Boolean} whether this transport is available.
 * @api public
 */

WS.prototype.check = function () {
  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../transport":23,"component-inherit":18,"debug":19,"engine.io-parser":30,"parseqs":40,"ws":14,"yeast":53}],29:[function(require,module,exports){
(function (global){
// browser shim for xmlhttprequest module

var hasCORS = require('has-cors');

module.exports = function (opts) {
  var xdomain = opts.xdomain;

  // scheme must be same when usign XDomainRequest
  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
  var xscheme = opts.xscheme;

  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
  // https://github.com/Automattic/engine.io-client/pull/217
  var enablesXDR = opts.enablesXDR;

  // XMLHttpRequest can be disabled on IE
  try {
    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
      return new XMLHttpRequest();
    }
  } catch (e) { }

  // Use XDomainRequest for IE8 if enablesXDR is true
  // because loading bar keeps flashing when using jsonp-polling
  // https://github.com/yujiosaka/socke.io-ie8-loading-example
  try {
    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
      return new XDomainRequest();
    }
  } catch (e) { }

  if (!xdomain) {
    try {
      return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
    } catch (e) { }
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"has-cors":35}],30:[function(require,module,exports){
(function (global){
/**
 * Module dependencies.
 */

var keys = require('./keys');
var hasBinary = require('has-binary2');
var sliceBuffer = require('arraybuffer.slice');
var after = require('after');
var utf8 = require('./utf8');

var base64encoder;
if (global && global.ArrayBuffer) {
  base64encoder = require('base64-arraybuffer');
}

/**
 * Check if we are running an android browser. That requires us to use
 * ArrayBuffer with polling transports...
 *
 * http://ghinda.net/jpeg-blob-ajax-android/
 */

var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

/**
 * Check if we are running in PhantomJS.
 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
 * https://github.com/ariya/phantomjs/issues/11395
 * @type boolean
 */
var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);

/**
 * When true, avoids using Blobs to encode payloads.
 * @type boolean
 */
var dontSendBlobs = isAndroid || isPhantomJS;

/**
 * Current protocol version.
 */

exports.protocol = 3;

/**
 * Packet types.
 */

var packets = exports.packets = {
    open:     0    // non-ws
  , close:    1    // non-ws
  , ping:     2
  , pong:     3
  , message:  4
  , upgrade:  5
  , noop:     6
};

var packetslist = keys(packets);

/**
 * Premade error packet.
 */

var err = { type: 'error', data: 'parser error' };

/**
 * Create a blob api even for blob builder when vendor prefixes exist
 */

var Blob = require('blob');

/**
 * Encodes a packet.
 *
 *     <packet type id> [ <data> ]
 *
 * Example:
 *
 *     5hello world
 *     3
 *     4
 *
 * Binary is encoded in an identical principle
 *
 * @api private
 */

exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = false;
  }

  if (typeof utf8encode === 'function') {
    callback = utf8encode;
    utf8encode = null;
  }

  var data = (packet.data === undefined)
    ? undefined
    : packet.data.buffer || packet.data;

  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
    return encodeArrayBuffer(packet, supportsBinary, callback);
  } else if (Blob && data instanceof global.Blob) {
    return encodeBlob(packet, supportsBinary, callback);
  }

  // might be an object with { base64: true, data: dataAsBase64String }
  if (data && data.base64) {
    return encodeBase64Object(packet, callback);
  }

  // Sending data as a utf-8 string
  var encoded = packets[packet.type];

  // data fragment is optional
  if (undefined !== packet.data) {
    encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
  }

  return callback('' + encoded);

};

function encodeBase64Object(packet, callback) {
  // packet data is an object { base64: true, data: dataAsBase64String }
  var message = 'b' + exports.packets[packet.type] + packet.data.data;
  return callback(message);
}

/**
 * Encode packet helpers for binary types
 */

function encodeArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var data = packet.data;
  var contentArray = new Uint8Array(data);
  var resultBuffer = new Uint8Array(1 + data.byteLength);

  resultBuffer[0] = packets[packet.type];
  for (var i = 0; i < contentArray.length; i++) {
    resultBuffer[i+1] = contentArray[i];
  }

  return callback(resultBuffer.buffer);
}

function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  var fr = new FileReader();
  fr.onload = function() {
    packet.data = fr.result;
    exports.encodePacket(packet, supportsBinary, true, callback);
  };
  return fr.readAsArrayBuffer(packet.data);
}

function encodeBlob(packet, supportsBinary, callback) {
  if (!supportsBinary) {
    return exports.encodeBase64Packet(packet, callback);
  }

  if (dontSendBlobs) {
    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
  }

  var length = new Uint8Array(1);
  length[0] = packets[packet.type];
  var blob = new Blob([length.buffer, packet.data]);

  return callback(blob);
}

/**
 * Encodes a packet with binary data in a base64 string
 *
 * @param {Object} packet, has `type` and `data`
 * @return {String} base64 encoded message
 */

exports.encodeBase64Packet = function(packet, callback) {
  var message = 'b' + exports.packets[packet.type];
  if (Blob && packet.data instanceof global.Blob) {
    var fr = new FileReader();
    fr.onload = function() {
      var b64 = fr.result.split(',')[1];
      callback(message + b64);
    };
    return fr.readAsDataURL(packet.data);
  }

  var b64data;
  try {
    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
  } catch (e) {
    // iPhone Safari doesn't let you apply with typed arrays
    var typed = new Uint8Array(packet.data);
    var basic = new Array(typed.length);
    for (var i = 0; i < typed.length; i++) {
      basic[i] = typed[i];
    }
    b64data = String.fromCharCode.apply(null, basic);
  }
  message += global.btoa(b64data);
  return callback(message);
};

/**
 * Decodes a packet. Changes format to Blob if requested.
 *
 * @return {Object} with `type` and `data` (if any)
 * @api private
 */

exports.decodePacket = function (data, binaryType, utf8decode) {
  if (data === undefined) {
    return err;
  }
  // String data
  if (typeof data === 'string') {
    if (data.charAt(0) === 'b') {
      return exports.decodeBase64Packet(data.substr(1), binaryType);
    }

    if (utf8decode) {
      data = tryDecode(data);
      if (data === false) {
        return err;
      }
    }
    var type = data.charAt(0);

    if (Number(type) != type || !packetslist[type]) {
      return err;
    }

    if (data.length > 1) {
      return { type: packetslist[type], data: data.substring(1) };
    } else {
      return { type: packetslist[type] };
    }
  }

  var asArray = new Uint8Array(data);
  var type = asArray[0];
  var rest = sliceBuffer(data, 1);
  if (Blob && binaryType === 'blob') {
    rest = new Blob([rest]);
  }
  return { type: packetslist[type], data: rest };
};

function tryDecode(data) {
  try {
    data = utf8.decode(data, { strict: false });
  } catch (e) {
    return false;
  }
  return data;
}

/**
 * Decodes a packet encoded in a base64 string
 *
 * @param {String} base64 encoded message
 * @return {Object} with `type` and `data` (if any)
 */

exports.decodeBase64Packet = function(msg, binaryType) {
  var type = packetslist[msg.charAt(0)];
  if (!base64encoder) {
    return { type: type, data: { base64: true, data: msg.substr(1) } };
  }

  var data = base64encoder.decode(msg.substr(1));

  if (binaryType === 'blob' && Blob) {
    data = new Blob([data]);
  }

  return { type: type, data: data };
};

/**
 * Encodes multiple messages (payload).
 *
 *     <length>:data
 *
 * Example:
 *
 *     11:hello world2:hi
 *
 * If any contents are binary, they will be encoded as base64 strings. Base64
 * encoded strings are marked with a b before the length specifier
 *
 * @param {Array} packets
 * @api private
 */

exports.encodePayload = function (packets, supportsBinary, callback) {
  if (typeof supportsBinary === 'function') {
    callback = supportsBinary;
    supportsBinary = null;
  }

  var isBinary = hasBinary(packets);

  if (supportsBinary && isBinary) {
    if (Blob && !dontSendBlobs) {
      return exports.encodePayloadAsBlob(packets, callback);
    }

    return exports.encodePayloadAsArrayBuffer(packets, callback);
  }

  if (!packets.length) {
    return callback('0:');
  }

  function setLengthHeader(message) {
    return message.length + ':' + message;
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, !isBinary ? false : supportsBinary, false, function(message) {
      doneCallback(null, setLengthHeader(message));
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(results.join(''));
  });
};

/**
 * Async array map using after
 */

function map(ary, each, done) {
  var result = new Array(ary.length);
  var next = after(ary.length, done);

  var eachWithIndex = function(i, el, cb) {
    each(el, function(error, msg) {
      result[i] = msg;
      cb(error, result);
    });
  };

  for (var i = 0; i < ary.length; i++) {
    eachWithIndex(i, ary[i], next);
  }
}

/*
 * Decodes data when a payload is maybe expected. Possible binary contents are
 * decoded from their base64 representation
 *
 * @param {String} data, callback method
 * @api public
 */

exports.decodePayload = function (data, binaryType, callback) {
  if (typeof data !== 'string') {
    return exports.decodePayloadAsBinary(data, binaryType, callback);
  }

  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var packet;
  if (data === '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

  var length = '', n, msg;

  for (var i = 0, l = data.length; i < l; i++) {
    var chr = data.charAt(i);

    if (chr !== ':') {
      length += chr;
      continue;
    }

    if (length === '' || (length != (n = Number(length)))) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    msg = data.substr(i + 1, n);

    if (length != msg.length) {
      // parser error - ignoring payload
      return callback(err, 0, 1);
    }

    if (msg.length) {
      packet = exports.decodePacket(msg, binaryType, false);

      if (err.type === packet.type && err.data === packet.data) {
        // parser error in individual packet - ignoring payload
        return callback(err, 0, 1);
      }

      var ret = callback(packet, i + n, l);
      if (false === ret) return;
    }

    // advance cursor
    i += n;
    length = '';
  }

  if (length !== '') {
    // parser error - ignoring payload
    return callback(err, 0, 1);
  }

};

/**
 * Encodes multiple messages (payload) as binary.
 *
 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
 * 255><data>
 *
 * Example:
 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
 *
 * @param {Array} packets
 * @return {ArrayBuffer} encoded payload
 * @api private
 */

exports.encodePayloadAsArrayBuffer = function(packets, callback) {
  if (!packets.length) {
    return callback(new ArrayBuffer(0));
  }

  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(data) {
      return doneCallback(null, data);
    });
  }

  map(packets, encodeOne, function(err, encodedPackets) {
    var totalLength = encodedPackets.reduce(function(acc, p) {
      var len;
      if (typeof p === 'string'){
        len = p.length;
      } else {
        len = p.byteLength;
      }
      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
    }, 0);

    var resultArray = new Uint8Array(totalLength);

    var bufferIndex = 0;
    encodedPackets.forEach(function(p) {
      var isString = typeof p === 'string';
      var ab = p;
      if (isString) {
        var view = new Uint8Array(p.length);
        for (var i = 0; i < p.length; i++) {
          view[i] = p.charCodeAt(i);
        }
        ab = view.buffer;
      }

      if (isString) { // not true binary
        resultArray[bufferIndex++] = 0;
      } else { // true binary
        resultArray[bufferIndex++] = 1;
      }

      var lenStr = ab.byteLength.toString();
      for (var i = 0; i < lenStr.length; i++) {
        resultArray[bufferIndex++] = parseInt(lenStr[i]);
      }
      resultArray[bufferIndex++] = 255;

      var view = new Uint8Array(ab);
      for (var i = 0; i < view.length; i++) {
        resultArray[bufferIndex++] = view[i];
      }
    });

    return callback(resultArray.buffer);
  });
};

/**
 * Encode as Blob
 */

exports.encodePayloadAsBlob = function(packets, callback) {
  function encodeOne(packet, doneCallback) {
    exports.encodePacket(packet, true, true, function(encoded) {
      var binaryIdentifier = new Uint8Array(1);
      binaryIdentifier[0] = 1;
      if (typeof encoded === 'string') {
        var view = new Uint8Array(encoded.length);
        for (var i = 0; i < encoded.length; i++) {
          view[i] = encoded.charCodeAt(i);
        }
        encoded = view.buffer;
        binaryIdentifier[0] = 0;
      }

      var len = (encoded instanceof ArrayBuffer)
        ? encoded.byteLength
        : encoded.size;

      var lenStr = len.toString();
      var lengthAry = new Uint8Array(lenStr.length + 1);
      for (var i = 0; i < lenStr.length; i++) {
        lengthAry[i] = parseInt(lenStr[i]);
      }
      lengthAry[lenStr.length] = 255;

      if (Blob) {
        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
        doneCallback(null, blob);
      }
    });
  }

  map(packets, encodeOne, function(err, results) {
    return callback(new Blob(results));
  });
};

/*
 * Decodes data when a payload is maybe expected. Strings are decoded by
 * interpreting each byte as a key code for entries marked to start with 0. See
 * description of encodePayloadAsBinary
 *
 * @param {ArrayBuffer} data, callback method
 * @api public
 */

exports.decodePayloadAsBinary = function (data, binaryType, callback) {
  if (typeof binaryType === 'function') {
    callback = binaryType;
    binaryType = null;
  }

  var bufferTail = data;
  var buffers = [];

  while (bufferTail.byteLength > 0) {
    var tailArray = new Uint8Array(bufferTail);
    var isString = tailArray[0] === 0;
    var msgLength = '';

    for (var i = 1; ; i++) {
      if (tailArray[i] === 255) break;

      // 310 = char length of Number.MAX_VALUE
      if (msgLength.length > 310) {
        return callback(err, 0, 1);
      }

      msgLength += tailArray[i];
    }

    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
    msgLength = parseInt(msgLength);

    var msg = sliceBuffer(bufferTail, 0, msgLength);
    if (isString) {
      try {
        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
      } catch (e) {
        // iPhone Safari doesn't let you apply to typed arrays
        var typed = new Uint8Array(msg);
        msg = '';
        for (var i = 0; i < typed.length; i++) {
          msg += String.fromCharCode(typed[i]);
        }
      }
    }

    buffers.push(msg);
    bufferTail = sliceBuffer(bufferTail, msgLength);
  }

  var total = buffers.length;
  buffers.forEach(function(buffer, i) {
    callback(exports.decodePacket(buffer, binaryType, true), i, total);
  });
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./keys":31,"./utf8":32,"after":8,"arraybuffer.slice":9,"base64-arraybuffer":11,"blob":13,"has-binary2":34}],31:[function(require,module,exports){

/**
 * Gets the keys for an object.
 *
 * @return {Array} keys
 * @api private
 */

module.exports = Object.keys || function keys (obj){
  var arr = [];
  var has = Object.prototype.hasOwnProperty;

  for (var i in obj) {
    if (has.call(obj, i)) {
      arr.push(i);
    }
  }
  return arr;
};

},{}],32:[function(require,module,exports){
(function (global){
/*! https://mths.be/utf8js v2.1.2 by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports = typeof exports == 'object' && exports;

	// Detect free variable `module`
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var stringFromCharCode = String.fromCharCode;

	// Taken from https://mths.be/punycode
	function ucs2decode(string) {
		var output = [];
		var counter = 0;
		var length = string.length;
		var value;
		var extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	// Taken from https://mths.be/punycode
	function ucs2encode(array) {
		var length = array.length;
		var index = -1;
		var value;
		var output = '';
		while (++index < length) {
			value = array[index];
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
		}
		return output;
	}

	function checkScalarValue(codePoint, strict) {
		if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
			if (strict) {
				throw Error(
					'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
					' is not a scalar value'
				);
			}
			return false;
		}
		return true;
	}
	/*--------------------------------------------------------------------------*/

	function createByte(codePoint, shift) {
		return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
	}

	function encodeCodePoint(codePoint, strict) {
		if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
			return stringFromCharCode(codePoint);
		}
		var symbol = '';
		if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
			symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
		}
		else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
			if (!checkScalarValue(codePoint, strict)) {
				codePoint = 0xFFFD;
			}
			symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
			symbol += createByte(codePoint, 6);
		}
		else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
			symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
			symbol += createByte(codePoint, 12);
			symbol += createByte(codePoint, 6);
		}
		symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
		return symbol;
	}

	function utf8encode(string, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		var codePoints = ucs2decode(string);
		var length = codePoints.length;
		var index = -1;
		var codePoint;
		var byteString = '';
		while (++index < length) {
			codePoint = codePoints[index];
			byteString += encodeCodePoint(codePoint, strict);
		}
		return byteString;
	}

	/*--------------------------------------------------------------------------*/

	function readContinuationByte() {
		if (byteIndex >= byteCount) {
			throw Error('Invalid byte index');
		}

		var continuationByte = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		if ((continuationByte & 0xC0) == 0x80) {
			return continuationByte & 0x3F;
		}

		// If we end up here, it’s not a continuation byte
		throw Error('Invalid continuation byte');
	}

	function decodeSymbol(strict) {
		var byte1;
		var byte2;
		var byte3;
		var byte4;
		var codePoint;

		if (byteIndex > byteCount) {
			throw Error('Invalid byte index');
		}

		if (byteIndex == byteCount) {
			return false;
		}

		// Read first byte
		byte1 = byteArray[byteIndex] & 0xFF;
		byteIndex++;

		// 1-byte sequence (no continuation bytes)
		if ((byte1 & 0x80) == 0) {
			return byte1;
		}

		// 2-byte sequence
		if ((byte1 & 0xE0) == 0xC0) {
			byte2 = readContinuationByte();
			codePoint = ((byte1 & 0x1F) << 6) | byte2;
			if (codePoint >= 0x80) {
				return codePoint;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 3-byte sequence (may include unpaired surrogates)
		if ((byte1 & 0xF0) == 0xE0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
			if (codePoint >= 0x0800) {
				return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
			} else {
				throw Error('Invalid continuation byte');
			}
		}

		// 4-byte sequence
		if ((byte1 & 0xF8) == 0xF0) {
			byte2 = readContinuationByte();
			byte3 = readContinuationByte();
			byte4 = readContinuationByte();
			codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
				(byte3 << 0x06) | byte4;
			if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
				return codePoint;
			}
		}

		throw Error('Invalid UTF-8 detected');
	}

	var byteArray;
	var byteCount;
	var byteIndex;
	function utf8decode(byteString, opts) {
		opts = opts || {};
		var strict = false !== opts.strict;

		byteArray = ucs2decode(byteString);
		byteCount = byteArray.length;
		byteIndex = 0;
		var codePoints = [];
		var tmp;
		while ((tmp = decodeSymbol(strict)) !== false) {
			codePoints.push(tmp);
		}
		return ucs2encode(codePoints);
	}

	/*--------------------------------------------------------------------------*/

	var utf8 = {
		'version': '2.1.2',
		'encode': utf8encode,
		'decode': utf8decode
	};

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return utf8;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = utf8;
		} else { // in Narwhal or RingoJS v0.7.0-
			var object = {};
			var hasOwnProperty = object.hasOwnProperty;
			for (var key in utf8) {
				hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.utf8 = utf8;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],33:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}],34:[function(require,module,exports){
(function (Buffer){
/* global Blob File */

/*
 * Module requirements.
 */

var isArray = require('isarray');

var toString = Object.prototype.toString;
var withNativeBlob = typeof Blob === 'function' ||
                        typeof Blob !== 'undefined' && toString.call(Blob) === '[object BlobConstructor]';
var withNativeFile = typeof File === 'function' ||
                        typeof File !== 'undefined' && toString.call(File) === '[object FileConstructor]';

/**
 * Module exports.
 */

module.exports = hasBinary;

/**
 * Checks for binary data.
 *
 * Supports Buffer, ArrayBuffer, Blob and File.
 *
 * @param {Object} anything
 * @api public
 */

function hasBinary (obj) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }

  if (isArray(obj)) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }

  if ((typeof Buffer === 'function' && Buffer.isBuffer && Buffer.isBuffer(obj)) ||
    (typeof ArrayBuffer === 'function' && obj instanceof ArrayBuffer) ||
    (withNativeBlob && obj instanceof Blob) ||
    (withNativeFile && obj instanceof File)
  ) {
    return true;
  }

  // see: https://github.com/Automattic/has-binary/pull/4
  if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }

  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }

  return false;
}

}).call(this,require("buffer").Buffer)
},{"buffer":15,"isarray":38}],35:[function(require,module,exports){

/**
 * Module exports.
 *
 * Logic borrowed from Modernizr:
 *
 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
 */

try {
  module.exports = typeof XMLHttpRequest !== 'undefined' &&
    'withCredentials' in new XMLHttpRequest();
} catch (err) {
  // if XMLHttp support is disabled in IE then it will throw
  // when trying to create
  module.exports = false;
}

},{}],36:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],37:[function(require,module,exports){

var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};
},{}],38:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],39:[function(require,module,exports){
/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}

},{}],40:[function(require,module,exports){
/**
 * Compiles a querystring
 * Returns string representation of the object
 *
 * @param {Object}
 * @api private
 */

exports.encode = function (obj) {
  var str = '';

  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (str.length) str += '&';
      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
    }
  }

  return str;
};

/**
 * Parses a simple querystring into an object
 *
 * @param {String} qs
 * @api private
 */

exports.decode = function(qs){
  var qry = {};
  var pairs = qs.split('&');
  for (var i = 0, l = pairs.length; i < l; i++) {
    var pair = pairs[i].split('=');
    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return qry;
};

},{}],41:[function(require,module,exports){
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

module.exports = function parseuri(str) {
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

},{}],42:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],43:[function(require,module,exports){
(function (global){
!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).PxtCloudAPI=t()}}(function(){return function u(o,f,a){function c(r,t){if(!f[r]){if(!o[r]){var n="function"==typeof require&&require;if(!t&&n)return n(r,!0);if(s)return s(r,!0);var e=new Error("Cannot find module '"+r+"'");throw e.code="MODULE_NOT_FOUND",e}var i=f[r]={exports:{}};o[r][0].call(i.exports,function(t){return c(o[r][1][t]||t)},i,i.exports,u,o,f,a)}return f[r].exports}for(var s="function"==typeof require&&require,t=0;t<a.length;t++)c(a[t]);return c}({1:[function(t,r,n){"use strict";var e;Object.defineProperty(n,"__esModule",{value:!0}),(e=n.Events||(n.Events={})).ChatNewMessage="new message",e.UserAddSelf="add self",e.UserLeft="user left",e.UserJoined="user joined",e.UserRemoveSelf="remove self",e.UserSelfInfo="self info",e.WorldPullAllData="pull all data",e.WorldPullData="pull data",e.WorldPushAllData="push all data",e.WorldPushData="push data",e.WorldPushDataDiff="push data diff"},{}],2:[function(t,r,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=t("deep-diff"),u=t("lodash"),o=t("msgpack-lite"),i=function(){function i(){this._synceddata={}}return i.encode=function(t){return o.encode(t)},i.decode=function(t){return o.decode(t)},i.applyDataDiff=function(r,t){return t&&t.forEach(function(t){return e.applyChange(r,r,t)}),r},i.calcDataDiff=function(t,r,n){return e.diff(t,r,function(t,r){return!(0!==t.length||void 0===r||!n||!n.filter)&&n.filter(r)})||[]},i.filteredData=function(t,n){return u.omitBy(t,function(t,r){return!(void 0===r||!n||!n.filter)&&n.filter(r,t)})},Object.defineProperty(i.prototype,"names",{get:function(){return Object.keys(this._synceddata)},enumerable:!0,configurable:!0}),i.prototype.isDataSource=function(t){return!!this._synceddata[t]},i.prototype.setDataSource=function(t,r){var n=this.getData(t),e=this._synceddata[t];return e||(this._synceddata[t]={source:r}),n&&this.setData(t,n),!!e},i.prototype.deleteDataSource=function(t){return delete this._synceddata[t]},i.prototype.getData=function(t){var r=this._synceddata[t];if(r)return r.source.data},i.prototype.calcDataDiff=function(t){var r=this._synceddata[t];if(r){var n=r.source,e=r.dataRecent||{};return r.dataRecent=i.filteredData(n.data,n.options),i.calcDataDiff(e,n.data,n.options)}},i.prototype.setData=function(t,r){this.applyDataDiff(t,i.calcDataDiff({},r))},i.prototype.applyDataDiff=function(t,r){var n=this._synceddata[t];n||(n=this._synceddata[t]={source:{data:{}}}),i.applyDataDiff(n.source.data,r)},i}();n.DataRepo=i},{"deep-diff":6,lodash:11,"msgpack-lite":12}],3:[function(t,r,n){"use strict";function e(t){for(var r in t)n.hasOwnProperty(r)||(n[r]=t[r])}Object.defineProperty(n,"__esModule",{value:!0}),e(t("./api")),e(t("./datarepo"))},{"./api":1,"./datarepo":2}],4:[function(t,r,n){"use strict";n.byteLength=function(t){var r=p(t),n=r[0],e=r[1];return 3*(n+e)/4-e},n.toByteArray=function(t){for(var r,n=p(t),e=n[0],i=n[1],u=new h((c=e,s=i,3*(c+s)/4-s)),o=0,f=0<i?e-4:e,a=0;a<f;a+=4)r=l[t.charCodeAt(a)]<<18|l[t.charCodeAt(a+1)]<<12|l[t.charCodeAt(a+2)]<<6|l[t.charCodeAt(a+3)],u[o++]=r>>16&255,u[o++]=r>>8&255,u[o++]=255&r;var c,s;2===i&&(r=l[t.charCodeAt(a)]<<2|l[t.charCodeAt(a+1)]>>4,u[o++]=255&r);1===i&&(r=l[t.charCodeAt(a)]<<10|l[t.charCodeAt(a+1)]<<4|l[t.charCodeAt(a+2)]>>2,u[o++]=r>>8&255,u[o++]=255&r);return u},n.fromByteArray=function(t){for(var r,n=t.length,e=n%3,i=[],u=0,o=n-e;u<o;u+=16383)i.push(a(t,u,o<u+16383?o:u+16383));1===e?(r=t[n-1],i.push(f[r>>2]+f[r<<4&63]+"==")):2===e&&(r=(t[n-2]<<8)+t[n-1],i.push(f[r>>10]+f[r>>4&63]+f[r<<2&63]+"="));return i.join("")};for(var f=[],l=[],h="undefined"!=typeof Uint8Array?Uint8Array:Array,e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=0,u=e.length;i<u;++i)f[i]=e[i],l[e.charCodeAt(i)]=i;function p(t){var r=t.length;if(0<r%4)throw new Error("Invalid string. Length must be a multiple of 4");var n=t.indexOf("=");return-1===n&&(n=r),[n,n===r?0:4-n%4]}function a(t,r,n){for(var e,i,u=[],o=r;o<n;o+=3)e=(t[o]<<16&16711680)+(t[o+1]<<8&65280)+(255&t[o+2]),u.push(f[(i=e)>>18&63]+f[i>>12&63]+f[i>>6&63]+f[63&i]);return u.join("")}l["-".charCodeAt(0)]=62,l["_".charCodeAt(0)]=63},{}],5:[function(t,r,n){"use strict";var e=t("base64-js"),u=t("ieee754");n.Buffer=l,n.SlowBuffer=function(t){+t!=t&&(t=0);return l.alloc(+t)},n.INSPECT_MAX_BYTES=50;var i=2147483647;function o(t){if(i<t)throw new RangeError("Invalid typed array length");var r=new Uint8Array(t);return r.__proto__=l.prototype,r}function l(t,r,n){if("number"==typeof t){if("string"==typeof r)throw new Error("If encoding is specified then the first argument must be a string");return c(t)}return f(t,r,n)}function f(t,r,n){if("number"==typeof t)throw new TypeError('"value" argument must not be a number');return L(t)||t&&L(t.buffer)?function(t,r,n){if(r<0||t.byteLength<r)throw new RangeError('"offset" is outside of buffer bounds');if(t.byteLength<r+(n||0))throw new RangeError('"length" is outside of buffer bounds');var e;e=void 0===r&&void 0===n?new Uint8Array(t):void 0===n?new Uint8Array(t,r):new Uint8Array(t,r,n);return e.__proto__=l.prototype,e}(t,r,n):"string"==typeof t?function(t,r){"string"==typeof r&&""!==r||(r="utf8");if(!l.isEncoding(r))throw new TypeError("Unknown encoding: "+r);var n=0|p(t,r),e=o(n),i=e.write(t,r);i!==n&&(e=e.slice(0,i));return e}(t,r):function(t){if(l.isBuffer(t)){var r=0|h(t.length),n=o(r);return 0===n.length||t.copy(n,0,0,r),n}if(t){if(ArrayBuffer.isView(t)||"length"in t)return"number"!=typeof t.length||T(t.length)?o(0):s(t);if("Buffer"===t.type&&Array.isArray(t.data))return s(t.data)}throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object.")}(t)}function a(t){if("number"!=typeof t)throw new TypeError('"size" argument must be of type number');if(t<0)throw new RangeError('"size" argument must not be negative')}function c(t){return a(t),o(t<0?0:0|h(t))}function s(t){for(var r=t.length<0?0:0|h(t.length),n=o(r),e=0;e<r;e+=1)n[e]=255&t[e];return n}function h(t){if(i<=t)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+i.toString(16)+" bytes");return 0|t}function p(t,r){if(l.isBuffer(t))return t.length;if(ArrayBuffer.isView(t)||L(t))return t.byteLength;"string"!=typeof t&&(t=""+t);var n=t.length;if(0===n)return 0;for(var e=!1;;)switch(r){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return R(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return C(t).length;default:if(e)return R(t).length;r=(""+r).toLowerCase(),e=!0}}function v(t,r,n){var e=t[r];t[r]=t[n],t[n]=e}function d(t,r,n,e,i){if(0===t.length)return-1;if("string"==typeof n?(e=n,n=0):2147483647<n?n=2147483647:n<-2147483648&&(n=-2147483648),T(n=+n)&&(n=i?0:t.length-1),n<0&&(n=t.length+n),n>=t.length){if(i)return-1;n=t.length-1}else if(n<0){if(!i)return-1;n=0}if("string"==typeof r&&(r=l.from(r,e)),l.isBuffer(r))return 0===r.length?-1:y(t,r,n,e,i);if("number"==typeof r)return r&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,r,n):Uint8Array.prototype.lastIndexOf.call(t,r,n):y(t,[r],n,e,i);throw new TypeError("val must be string, number or Buffer")}function y(t,r,n,e,i){var u,o=1,f=t.length,a=r.length;if(void 0!==e&&("ucs2"===(e=String(e).toLowerCase())||"ucs-2"===e||"utf16le"===e||"utf-16le"===e)){if(t.length<2||r.length<2)return-1;f/=o=2,a/=2,n/=2}function c(t,r){return 1===o?t[r]:t.readUInt16BE(r*o)}if(i){var s=-1;for(u=n;u<f;u++)if(c(t,u)===c(r,-1===s?0:u-s)){if(-1===s&&(s=u),u-s+1===a)return s*o}else-1!==s&&(u-=u-s),s=-1}else for(f<n+a&&(n=f-a),u=n;0<=u;u--){for(var l=!0,h=0;h<a;h++)if(c(t,u+h)!==c(r,h)){l=!1;break}if(l)return u}return-1}function g(t,r,n,e){n=Number(n)||0;var i=t.length-n;e?i<(e=Number(e))&&(e=i):e=i;var u=r.length;u/2<e&&(e=u/2);for(var o=0;o<e;++o){var f=parseInt(r.substr(2*o,2),16);if(T(f))return o;t[n+o]=f}return o}function _(t,r,n,e){return P(function(t){for(var r=[],n=0;n<t.length;++n)r.push(255&t.charCodeAt(n));return r}(r),t,n,e)}function b(t,r,n){return 0===r&&n===t.length?e.fromByteArray(t):e.fromByteArray(t.slice(r,n))}function w(t,r,n){n=Math.min(t.length,n);for(var e=[],i=r;i<n;){var u,o,f,a,c=t[i],s=null,l=239<c?4:223<c?3:191<c?2:1;if(i+l<=n)switch(l){case 1:c<128&&(s=c);break;case 2:128==(192&(u=t[i+1]))&&127<(a=(31&c)<<6|63&u)&&(s=a);break;case 3:u=t[i+1],o=t[i+2],128==(192&u)&&128==(192&o)&&2047<(a=(15&c)<<12|(63&u)<<6|63&o)&&(a<55296||57343<a)&&(s=a);break;case 4:u=t[i+1],o=t[i+2],f=t[i+3],128==(192&u)&&128==(192&o)&&128==(192&f)&&65535<(a=(15&c)<<18|(63&u)<<12|(63&o)<<6|63&f)&&a<1114112&&(s=a)}null===s?(s=65533,l=1):65535<s&&(s-=65536,e.push(s>>>10&1023|55296),s=56320|1023&s),e.push(s),i+=l}return function(t){var r=t.length;if(r<=m)return String.fromCharCode.apply(String,t);var n="",e=0;for(;e<r;)n+=String.fromCharCode.apply(String,t.slice(e,e+=m));return n}(e)}n.kMaxLength=i,(l.TYPED_ARRAY_SUPPORT=function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()}catch(t){return!1}}())||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),Object.defineProperty(l.prototype,"parent",{get:function(){if(this instanceof l)return this.buffer}}),Object.defineProperty(l.prototype,"offset",{get:function(){if(this instanceof l)return this.byteOffset}}),"undefined"!=typeof Symbol&&Symbol.species&&l[Symbol.species]===l&&Object.defineProperty(l,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),l.poolSize=8192,l.from=function(t,r,n){return f(t,r,n)},l.prototype.__proto__=Uint8Array.prototype,l.__proto__=Uint8Array,l.alloc=function(t,r,n){return i=r,u=n,a(e=t),e<=0?o(e):void 0!==i?"string"==typeof u?o(e).fill(i,u):o(e).fill(i):o(e);var e,i,u},l.allocUnsafe=function(t){return c(t)},l.allocUnsafeSlow=function(t){return c(t)},l.isBuffer=function(t){return null!=t&&!0===t._isBuffer},l.compare=function(t,r){if(!l.isBuffer(t)||!l.isBuffer(r))throw new TypeError("Arguments must be Buffers");if(t===r)return 0;for(var n=t.length,e=r.length,i=0,u=Math.min(n,e);i<u;++i)if(t[i]!==r[i]){n=t[i],e=r[i];break}return n<e?-1:e<n?1:0},l.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},l.concat=function(t,r){if(!Array.isArray(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return l.alloc(0);var n;if(void 0===r)for(n=r=0;n<t.length;++n)r+=t[n].length;var e=l.allocUnsafe(r),i=0;for(n=0;n<t.length;++n){var u=t[n];if(ArrayBuffer.isView(u)&&(u=l.from(u)),!l.isBuffer(u))throw new TypeError('"list" argument must be an Array of Buffers');u.copy(e,i),i+=u.length}return e},l.byteLength=p,l.prototype._isBuffer=!0,l.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var r=0;r<t;r+=2)v(this,r,r+1);return this},l.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var r=0;r<t;r+=4)v(this,r,r+3),v(this,r+1,r+2);return this},l.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var r=0;r<t;r+=8)v(this,r,r+7),v(this,r+1,r+6),v(this,r+2,r+5),v(this,r+3,r+4);return this},l.prototype.toLocaleString=l.prototype.toString=function(){var t=this.length;return 0===t?"":0===arguments.length?w(this,0,t):function(t,r,n){var e=!1;if((void 0===r||r<0)&&(r=0),r>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if((n>>>=0)<=(r>>>=0))return"";for(t||(t="utf8");;)switch(t){case"hex":return A(this,r,n);case"utf8":case"utf-8":return w(this,r,n);case"ascii":return E(this,r,n);case"latin1":case"binary":return x(this,r,n);case"base64":return b(this,r,n);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return k(this,r,n);default:if(e)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),e=!0}}.apply(this,arguments)},l.prototype.equals=function(t){if(!l.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===l.compare(this,t)},l.prototype.inspect=function(){var t="",r=n.INSPECT_MAX_BYTES;return 0<this.length&&(t=this.toString("hex",0,r).match(/.{2}/g).join(" "),this.length>r&&(t+=" ... ")),"<Buffer "+t+">"},l.prototype.compare=function(t,r,n,e,i){if(!l.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===r&&(r=0),void 0===n&&(n=t?t.length:0),void 0===e&&(e=0),void 0===i&&(i=this.length),r<0||n>t.length||e<0||i>this.length)throw new RangeError("out of range index");if(i<=e&&n<=r)return 0;if(i<=e)return-1;if(n<=r)return 1;if(this===t)return 0;for(var u=(i>>>=0)-(e>>>=0),o=(n>>>=0)-(r>>>=0),f=Math.min(u,o),a=this.slice(e,i),c=t.slice(r,n),s=0;s<f;++s)if(a[s]!==c[s]){u=a[s],o=c[s];break}return u<o?-1:o<u?1:0},l.prototype.includes=function(t,r,n){return-1!==this.indexOf(t,r,n)},l.prototype.indexOf=function(t,r,n){return d(this,t,r,n,!0)},l.prototype.lastIndexOf=function(t,r,n){return d(this,t,r,n,!1)},l.prototype.write=function(t,r,n,e){if(void 0===r)e="utf8",n=this.length,r=0;else if(void 0===n&&"string"==typeof r)e=r,n=this.length,r=0;else{if(!isFinite(r))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");r>>>=0,isFinite(n)?(n>>>=0,void 0===e&&(e="utf8")):(e=n,n=void 0)}var i=this.length-r;if((void 0===n||i<n)&&(n=i),0<t.length&&(n<0||r<0)||r>this.length)throw new RangeError("Attempt to write outside buffer bounds");e||(e="utf8");for(var u,o,f,a,c,s,l,h,p,v=!1;;)switch(e){case"hex":return g(this,t,r,n);case"utf8":case"utf-8":return h=r,p=n,P(R(t,(l=this).length-h),l,h,p);case"ascii":return _(this,t,r,n);case"latin1":case"binary":return _(this,t,r,n);case"base64":return a=this,c=r,s=n,P(C(t),a,c,s);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return o=r,f=n,P(function(t,r){for(var n,e,i,u=[],o=0;o<t.length&&!((r-=2)<0);++o)n=t.charCodeAt(o),e=n>>8,i=n%256,u.push(i),u.push(e);return u}(t,(u=this).length-o),u,o,f);default:if(v)throw new TypeError("Unknown encoding: "+e);e=(""+e).toLowerCase(),v=!0}},l.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var m=4096;function E(t,r,n){var e="";n=Math.min(t.length,n);for(var i=r;i<n;++i)e+=String.fromCharCode(127&t[i]);return e}function x(t,r,n){var e="";n=Math.min(t.length,n);for(var i=r;i<n;++i)e+=String.fromCharCode(t[i]);return e}function A(t,r,n){var e=t.length;(!r||r<0)&&(r=0),(!n||n<0||e<n)&&(n=e);for(var i="",u=r;u<n;++u)i+=D(t[u]);return i}function k(t,r,n){for(var e=t.slice(r,n),i="",u=0;u<e.length;u+=2)i+=String.fromCharCode(e[u]+256*e[u+1]);return i}function B(t,r,n){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(n<t+r)throw new RangeError("Trying to access beyond buffer length")}function U(t,r,n,e,i,u){if(!l.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(i<r||r<u)throw new RangeError('"value" argument is out of bounds');if(n+e>t.length)throw new RangeError("Index out of range")}function I(t,r,n,e,i,u){if(n+e>t.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function j(t,r,n,e,i){return r=+r,n>>>=0,i||I(t,0,n,4),u.write(t,r,n,e,23,4),n+4}function S(t,r,n,e,i){return r=+r,n>>>=0,i||I(t,0,n,8),u.write(t,r,n,e,52,8),n+8}l.prototype.slice=function(t,r){var n=this.length;(t=~~t)<0?(t+=n)<0&&(t=0):n<t&&(t=n),(r=void 0===r?n:~~r)<0?(r+=n)<0&&(r=0):n<r&&(r=n),r<t&&(r=t);var e=this.subarray(t,r);return e.__proto__=l.prototype,e},l.prototype.readUIntLE=function(t,r,n){t>>>=0,r>>>=0,n||B(t,r,this.length);for(var e=this[t],i=1,u=0;++u<r&&(i*=256);)e+=this[t+u]*i;return e},l.prototype.readUIntBE=function(t,r,n){t>>>=0,r>>>=0,n||B(t,r,this.length);for(var e=this[t+--r],i=1;0<r&&(i*=256);)e+=this[t+--r]*i;return e},l.prototype.readUInt8=function(t,r){return t>>>=0,r||B(t,1,this.length),this[t]},l.prototype.readUInt16LE=function(t,r){return t>>>=0,r||B(t,2,this.length),this[t]|this[t+1]<<8},l.prototype.readUInt16BE=function(t,r){return t>>>=0,r||B(t,2,this.length),this[t]<<8|this[t+1]},l.prototype.readUInt32LE=function(t,r){return t>>>=0,r||B(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},l.prototype.readUInt32BE=function(t,r){return t>>>=0,r||B(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},l.prototype.readIntLE=function(t,r,n){t>>>=0,r>>>=0,n||B(t,r,this.length);for(var e=this[t],i=1,u=0;++u<r&&(i*=256);)e+=this[t+u]*i;return(i*=128)<=e&&(e-=Math.pow(2,8*r)),e},l.prototype.readIntBE=function(t,r,n){t>>>=0,r>>>=0,n||B(t,r,this.length);for(var e=r,i=1,u=this[t+--e];0<e&&(i*=256);)u+=this[t+--e]*i;return(i*=128)<=u&&(u-=Math.pow(2,8*r)),u},l.prototype.readInt8=function(t,r){return t>>>=0,r||B(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},l.prototype.readInt16LE=function(t,r){t>>>=0,r||B(t,2,this.length);var n=this[t]|this[t+1]<<8;return 32768&n?4294901760|n:n},l.prototype.readInt16BE=function(t,r){t>>>=0,r||B(t,2,this.length);var n=this[t+1]|this[t]<<8;return 32768&n?4294901760|n:n},l.prototype.readInt32LE=function(t,r){return t>>>=0,r||B(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},l.prototype.readInt32BE=function(t,r){return t>>>=0,r||B(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},l.prototype.readFloatLE=function(t,r){return t>>>=0,r||B(t,4,this.length),u.read(this,t,!0,23,4)},l.prototype.readFloatBE=function(t,r){return t>>>=0,r||B(t,4,this.length),u.read(this,t,!1,23,4)},l.prototype.readDoubleLE=function(t,r){return t>>>=0,r||B(t,8,this.length),u.read(this,t,!0,52,8)},l.prototype.readDoubleBE=function(t,r){return t>>>=0,r||B(t,8,this.length),u.read(this,t,!1,52,8)},l.prototype.writeUIntLE=function(t,r,n,e){(t=+t,r>>>=0,n>>>=0,e)||U(this,t,r,n,Math.pow(2,8*n)-1,0);var i=1,u=0;for(this[r]=255&t;++u<n&&(i*=256);)this[r+u]=t/i&255;return r+n},l.prototype.writeUIntBE=function(t,r,n,e){(t=+t,r>>>=0,n>>>=0,e)||U(this,t,r,n,Math.pow(2,8*n)-1,0);var i=n-1,u=1;for(this[r+i]=255&t;0<=--i&&(u*=256);)this[r+i]=t/u&255;return r+n},l.prototype.writeUInt8=function(t,r,n){return t=+t,r>>>=0,n||U(this,t,r,1,255,0),this[r]=255&t,r+1},l.prototype.writeUInt16LE=function(t,r,n){return t=+t,r>>>=0,n||U(this,t,r,2,65535,0),this[r]=255&t,this[r+1]=t>>>8,r+2},l.prototype.writeUInt16BE=function(t,r,n){return t=+t,r>>>=0,n||U(this,t,r,2,65535,0),this[r]=t>>>8,this[r+1]=255&t,r+2},l.prototype.writeUInt32LE=function(t,r,n){return t=+t,r>>>=0,n||U(this,t,r,4,4294967295,0),this[r+3]=t>>>24,this[r+2]=t>>>16,this[r+1]=t>>>8,this[r]=255&t,r+4},l.prototype.writeUInt32BE=function(t,r,n){return t=+t,r>>>=0,n||U(this,t,r,4,4294967295,0),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t,r+4},l.prototype.writeIntLE=function(t,r,n,e){if(t=+t,r>>>=0,!e){var i=Math.pow(2,8*n-1);U(this,t,r,n,i-1,-i)}var u=0,o=1,f=0;for(this[r]=255&t;++u<n&&(o*=256);)t<0&&0===f&&0!==this[r+u-1]&&(f=1),this[r+u]=(t/o>>0)-f&255;return r+n},l.prototype.writeIntBE=function(t,r,n,e){if(t=+t,r>>>=0,!e){var i=Math.pow(2,8*n-1);U(this,t,r,n,i-1,-i)}var u=n-1,o=1,f=0;for(this[r+u]=255&t;0<=--u&&(o*=256);)t<0&&0===f&&0!==this[r+u+1]&&(f=1),this[r+u]=(t/o>>0)-f&255;return r+n},l.prototype.writeInt8=function(t,r,n){return t=+t,r>>>=0,n||U(this,t,r,1,127,-128),t<0&&(t=255+t+1),this[r]=255&t,r+1},l.prototype.writeInt16LE=function(t,r,n){return t=+t,r>>>=0,n||U(this,t,r,2,32767,-32768),this[r]=255&t,this[r+1]=t>>>8,r+2},l.prototype.writeInt16BE=function(t,r,n){return t=+t,r>>>=0,n||U(this,t,r,2,32767,-32768),this[r]=t>>>8,this[r+1]=255&t,r+2},l.prototype.writeInt32LE=function(t,r,n){return t=+t,r>>>=0,n||U(this,t,r,4,2147483647,-2147483648),this[r]=255&t,this[r+1]=t>>>8,this[r+2]=t>>>16,this[r+3]=t>>>24,r+4},l.prototype.writeInt32BE=function(t,r,n){return t=+t,r>>>=0,n||U(this,t,r,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),this[r]=t>>>24,this[r+1]=t>>>16,this[r+2]=t>>>8,this[r+3]=255&t,r+4},l.prototype.writeFloatLE=function(t,r,n){return j(this,t,r,!0,n)},l.prototype.writeFloatBE=function(t,r,n){return j(this,t,r,!1,n)},l.prototype.writeDoubleLE=function(t,r,n){return S(this,t,r,!0,n)},l.prototype.writeDoubleBE=function(t,r,n){return S(this,t,r,!1,n)},l.prototype.copy=function(t,r,n,e){if(!l.isBuffer(t))throw new TypeError("argument should be a Buffer");if(n||(n=0),e||0===e||(e=this.length),r>=t.length&&(r=t.length),r||(r=0),0<e&&e<n&&(e=n),e===n)return 0;if(0===t.length||0===this.length)return 0;if(r<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("Index out of range");if(e<0)throw new RangeError("sourceEnd out of bounds");e>this.length&&(e=this.length),t.length-r<e-n&&(e=t.length-r+n);var i=e-n;if(this===t&&"function"==typeof Uint8Array.prototype.copyWithin)this.copyWithin(r,n,e);else if(this===t&&n<r&&r<e)for(var u=i-1;0<=u;--u)t[u+r]=this[u+n];else Uint8Array.prototype.set.call(t,this.subarray(n,e),r);return i},l.prototype.fill=function(t,r,n,e){if("string"==typeof t){if("string"==typeof r?(e=r,r=0,n=this.length):"string"==typeof n&&(e=n,n=this.length),void 0!==e&&"string"!=typeof e)throw new TypeError("encoding must be a string");if("string"==typeof e&&!l.isEncoding(e))throw new TypeError("Unknown encoding: "+e);if(1===t.length){var i=t.charCodeAt(0);("utf8"===e&&i<128||"latin1"===e)&&(t=i)}}else"number"==typeof t&&(t&=255);if(r<0||this.length<r||this.length<n)throw new RangeError("Out of range index");if(n<=r)return this;var u;if(r>>>=0,n=void 0===n?this.length:n>>>0,t||(t=0),"number"==typeof t)for(u=r;u<n;++u)this[u]=t;else{var o=l.isBuffer(t)?t:new l(t,e),f=o.length;if(0===f)throw new TypeError('The value "'+t+'" is invalid for argument "value"');for(u=0;u<n-r;++u)this[u+r]=o[u%f]}return this};var O=/[^+/0-9A-Za-z-_]/g;function D(t){return t<16?"0"+t.toString(16):t.toString(16)}function R(t,r){var n;r=r||1/0;for(var e=t.length,i=null,u=[],o=0;o<e;++o){if(55295<(n=t.charCodeAt(o))&&n<57344){if(!i){if(56319<n){-1<(r-=3)&&u.push(239,191,189);continue}if(o+1===e){-1<(r-=3)&&u.push(239,191,189);continue}i=n;continue}if(n<56320){-1<(r-=3)&&u.push(239,191,189),i=n;continue}n=65536+(i-55296<<10|n-56320)}else i&&-1<(r-=3)&&u.push(239,191,189);if(i=null,n<128){if((r-=1)<0)break;u.push(n)}else if(n<2048){if((r-=2)<0)break;u.push(n>>6|192,63&n|128)}else if(n<65536){if((r-=3)<0)break;u.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((r-=4)<0)break;u.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return u}function C(t){return e.toByteArray(function(t){if((t=(t=t.split("=")[0]).trim().replace(O,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function P(t,r,n,e){for(var i=0;i<e&&!(i+n>=r.length||i>=t.length);++i)r[i+n]=t[i];return i}function L(t){return t instanceof ArrayBuffer||null!=t&&null!=t.constructor&&"ArrayBuffer"===t.constructor.name&&"number"==typeof t.byteLength}function T(t){return t!=t}},{"base64-js":4,ieee754:8}],6:[function(t,i,u){!function(t,r){var n=function(t){var o=["N","E","A","D"];function r(t,r){t.super_=r,t.prototype=Object.create(r.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}})}function n(t,r){Object.defineProperty(this,"kind",{value:t,enumerable:!0}),r&&r.length&&Object.defineProperty(this,"path",{value:r,enumerable:!0})}function w(t,r,n){w.super_.call(this,"E",t),Object.defineProperty(this,"lhs",{value:r,enumerable:!0}),Object.defineProperty(this,"rhs",{value:n,enumerable:!0})}function m(t,r){m.super_.call(this,"N",t),Object.defineProperty(this,"rhs",{value:r,enumerable:!0})}function E(t,r){E.super_.call(this,"D",t),Object.defineProperty(this,"lhs",{value:r,enumerable:!0})}function x(t,r,n){x.super_.call(this,"A",t),Object.defineProperty(this,"index",{value:r,enumerable:!0}),Object.defineProperty(this,"item",{value:n,enumerable:!0})}function f(t,r,n){var e=t.slice((n||r)+1||t.length);return t.length=r<0?t.length+r:r,t.push.apply(t,e),t}function A(t){var r=typeof t;return"object"!==r?r:t===Math?"math":null===t?"null":Array.isArray(t)?"array":"[object Date]"===Object.prototype.toString.call(t)?"date":"function"==typeof t.toString&&/^\/.*\//.test(t.toString())?"regexp":"object"}function a(t){var r=0;if(0===t.length)return r;for(var n=0;n<t.length;n++){var e=t.charCodeAt(n);r=(r<<5)-r+e,r&=r}return r}function k(t){var r=0,n=A(t);if("array"===n){t.forEach(function(t){r+=k(t)});var e="[type: array, hash: "+r+"]";return r+a(e)}if("object"===n){for(var i in t)if(t.hasOwnProperty(i)){var u="[ type: object, key: "+i+", value hash: "+k(t[i])+"]";r+=a(u)}return r}var o="[ type: "+n+" ; value: "+t+"]";return r+a(o)}function B(t,r,n,e,i,u,o,f){n=n||[],o=o||[];var a=(i=i||[]).slice(0);if(null!=u){if(e){if("function"==typeof e&&e(a,u))return;if("object"==typeof e){if(e.prefilter&&e.prefilter(a,u))return;if(e.normalize){var c=e.normalize(a,u,t,r);c&&(t=c[0],r=c[1])}}}a.push(u)}"regexp"===A(t)&&"regexp"===A(r)&&(t=t.toString(),r=r.toString());var s,l,h,p,v=typeof t,d=typeof r,y="undefined"!==v||o&&0<o.length&&o[o.length-1].lhs&&Object.getOwnPropertyDescriptor(o[o.length-1].lhs,u),g="undefined"!==d||o&&0<o.length&&o[o.length-1].rhs&&Object.getOwnPropertyDescriptor(o[o.length-1].rhs,u);if(!y&&g)n.push(new m(a,r));else if(!g&&y)n.push(new E(a,t));else if(A(t)!==A(r))n.push(new w(a,t,r));else if("date"===A(t)&&t-r!=0)n.push(new w(a,t,r));else if("object"===v&&null!==t&&null!==r){for(s=o.length-1;-1<s;--s)if(o[s].lhs===t){p=!0;break}if(p)t!==r&&n.push(new w(a,t,r));else{if(o.push({lhs:t,rhs:r}),Array.isArray(t)){for(f&&(t.sort(function(t,r){return k(t)-k(r)}),r.sort(function(t,r){return k(t)-k(r)})),s=r.length-1,l=t.length-1;l<s;)n.push(new x(a,s,new m(void 0,r[s--])));for(;s<l;)n.push(new x(a,l,new E(void 0,t[l--])));for(;0<=s;--s)B(t[s],r[s],n,e,a,s,o,f)}else{var _=Object.keys(t),b=Object.keys(r);for(s=0;s<_.length;++s)h=_[s],0<=(p=b.indexOf(h))?(B(t[h],r[h],n,e,a,h,o,f),b[p]=null):B(t[h],void 0,n,e,a,h,o,f);for(s=0;s<b.length;++s)(h=b[s])&&B(void 0,r[h],n,e,a,h,o,f)}o.length=o.length-1}}else t!==r&&("number"===v&&isNaN(t)&&isNaN(r)||n.push(new w(a,t,r)))}function c(t,r,n,e,i){var u=[];if(B(t,r,u,e,null,null,null,i),n)for(var o=0;o<u.length;++o)n(u[o]);return u}function e(t,r,n,e){var i=e?function(t){t&&e.push(t)}:void 0,u=c(t,r,i,n);return e||(u.length?u:void 0)}function i(t,r,n){if(void 0===n&&r&&~o.indexOf(r.kind)&&(n=r),t&&n&&n.kind){for(var e=t,i=-1,u=n.path?n.path.length-1:0;++i<u;)void 0===e[n.path[i]]&&(e[n.path[i]]=void 0!==n.path[i+1]&&"number"==typeof n.path[i+1]?[]:{}),e=e[n.path[i]];switch(n.kind){case"A":n.path&&void 0===e[n.path[i]]&&(e[n.path[i]]=[]),function t(r,n,e){if(e.path&&e.path.length){var i,u=r[n],o=e.path.length-1;for(i=0;i<o;i++)u=u[e.path[i]];switch(e.kind){case"A":t(u[e.path[i]],e.index,e.item);break;case"D":delete u[e.path[i]];break;case"E":case"N":u[e.path[i]]=e.rhs}}else switch(e.kind){case"A":t(r[n],e.index,e.item);break;case"D":r=f(r,n);break;case"E":case"N":r[n]=e.rhs}return r}(n.path?e[n.path[i]]:e,n.index,n.item);break;case"D":delete e[n.path[i]];break;case"E":case"N":e[n.path[i]]=n.rhs}}}return r(w,n),r(m,n),r(E,n),r(x,n),Object.defineProperties(e,{diff:{value:e,enumerable:!0},orderIndependentDiff:{value:function(t,r,n,e){var i=e?function(t){t&&e.push(t)}:void 0,u=c(t,r,i,n,!0);return e||(u.length?u:void 0)},enumerable:!0},observableDiff:{value:c,enumerable:!0},orderIndependentObservableDiff:{value:function(t,r,n,e,i,u,o){return B(t,r,n,e,i,u,o,!0)},enumerable:!0},orderIndepHash:{value:k,enumerable:!0},applyDiff:{value:function(r,n,e){r&&n&&c(r,n,function(t){e&&!e(r,n,t)||i(r,n,t)})},enumerable:!0},applyChange:{value:i,enumerable:!0},revertChange:{value:function(t,r,n){if(t&&r&&n&&n.kind){var e,i,u=t;for(i=n.path.length-1,e=0;e<i;e++)void 0===u[n.path[e]]&&(u[n.path[e]]={}),u=u[n.path[e]];switch(n.kind){case"A":!function t(r,n,e){if(e.path&&e.path.length){var i,u=r[n],o=e.path.length-1;for(i=0;i<o;i++)u=u[e.path[i]];switch(e.kind){case"A":t(u[e.path[i]],e.index,e.item);break;case"D":case"E":u[e.path[i]]=e.lhs;break;case"N":delete u[e.path[i]]}}else switch(e.kind){case"A":t(r[n],e.index,e.item);break;case"D":case"E":r[n]=e.lhs;break;case"N":r=f(r,n)}return r}(u[n.path[e]],n.index,n.item);break;case"D":case"E":u[n.path[e]]=n.lhs;break;case"N":delete u[n.path[e]]}}},enumerable:!0},isConflict:{value:function(){return"undefined"!=typeof $conflict},enumerable:!0}}),e.DeepDiff=e,t.DeepDiff=e}(t);if("object"==typeof u)i.exports=n;else{var e=t.DeepDiff;n.noConflict=function(){return t.DeepDiff===n&&(t.DeepDiff=e),n},t.DeepDiff=n}}(this)},{}],7:[function(t,e,r){!function(t){void 0!==e&&(e.exports=t);var i="listeners",n={on:function(t,r){return o(this,t).push(r),this},once:function(t,r){var n=this;return e.originalListener=r,o(n,t).push(e),n;function e(){u.call(n,t,e),r.apply(this,arguments)}},off:u,emit:function(t,r){var n=this,e=o(n,t,!0);if(!e)return!1;var i=arguments.length;if(1===i)e.forEach(function(t){t.call(n)});else if(2===i)e.forEach(function(t){t.call(n,r)});else{var u=Array.prototype.slice.call(arguments,1);e.forEach(function(t){t.apply(n,u)})}return!!e.length}};function r(t){for(var r in n)t[r]=n[r];return t}function u(t,r){var n,e=this;if(arguments.length){if(r){if(n=o(e,t,!0)){if(!(n=n.filter(function(t){return t!==r&&t.originalListener!==r})).length)return u.call(e,t);e[i][t]=n}}else if((n=e[i])&&(delete n[t],!Object.keys(n).length))return u.call(e)}else delete e[i];return e}function o(t,r,n){if(!n||t[i]){var e=t[i]||(t[i]={});return e[r]||(e[r]=[])}}r(t.prototype),t.mixin=r}(function t(){if(!(this instanceof t))return new t})},{}],8:[function(t,r,n){n.read=function(t,r,n,e,i){var u,o,f=8*i-e-1,a=(1<<f)-1,c=a>>1,s=-7,l=n?i-1:0,h=n?-1:1,p=t[r+l];for(l+=h,u=p&(1<<-s)-1,p>>=-s,s+=f;0<s;u=256*u+t[r+l],l+=h,s-=8);for(o=u&(1<<-s)-1,u>>=-s,s+=e;0<s;o=256*o+t[r+l],l+=h,s-=8);if(0===u)u=1-c;else{if(u===a)return o?NaN:1/0*(p?-1:1);o+=Math.pow(2,e),u-=c}return(p?-1:1)*o*Math.pow(2,u-e)},n.write=function(t,r,n,e,i,u){var o,f,a,c=8*u-i-1,s=(1<<c)-1,l=s>>1,h=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,p=e?0:u-1,v=e?1:-1,d=r<0||0===r&&1/r<0?1:0;for(r=Math.abs(r),isNaN(r)||r===1/0?(f=isNaN(r)?1:0,o=s):(o=Math.floor(Math.log(r)/Math.LN2),r*(a=Math.pow(2,-o))<1&&(o--,a*=2),2<=(r+=1<=o+l?h/a:h*Math.pow(2,1-l))*a&&(o++,a/=2),s<=o+l?(f=0,o=s):1<=o+l?(f=(r*a-1)*Math.pow(2,i),o+=l):(f=r*Math.pow(2,l-1)*Math.pow(2,i),o=0));8<=i;t[n+p]=255&f,p+=v,f/=256,i-=8);for(o=o<<i|f,c+=i;0<c;t[n+p]=255&o,p+=v,o/=256,c-=8);t[n+p-v]|=128*d}},{}],9:[function(t,r,n){(function(i){!function(_){var b,w="undefined",m=w!==typeof i&&i,E=w!==typeof Uint8Array&&Uint8Array,x=w!==typeof ArrayBuffer&&ArrayBuffer,A=[0,0,0,0,0,0,0,0],e=Array.isArray||function(t){return!!t&&"[object Array]"==Object.prototype.toString.call(t)},k=4294967296;function t(t,r,a){var s=r?0:4,l=r?4:0,e=r?0:3,i=r?1:2,u=r?2:1,o=r?3:0,f=r?D:C,c=r?R:P,n=v.prototype,h="is"+t,p="_"+h;return n.buffer=void 0,n.offset=0,n[p]=!0,n.toNumber=d,n.toString=function(t){var r=this.buffer,n=this.offset,e=g(r,n+s),i=g(r,n+l),u="",o=!a&&2147483648&e;o&&(e=~e,i=k-i);t=t||10;for(;;){var f=e%t*k+i;if(e=Math.floor(e/t),i=Math.floor(f/t),u=(f%t).toString(t)+u,!e&&!i)break}o&&(u="-"+u);return u},n.toJSON=d,n.toArray=B,m&&(n.toBuffer=U),E&&(n.toArrayBuffer=I),v[h]=function(t){return!(!t||!t[p])},_[t]=v;function v(t,r,n,e){return this instanceof v?function(t,r,n,e,i){E&&x&&(r instanceof x&&(r=new E(r)),e instanceof x&&(e=new E(e)));if(!(r||n||e||b))return void(t.buffer=O(A,0));if(!j(r,n)){var u=b||Array;i=n,e=r,n=0,r=new u(8)}if(t.buffer=r,t.offset=n|=0,w===typeof e)return;"string"==typeof e?function(t,r,n,e){var i=0,u=n.length,o=0,f=0;"-"===n[0]&&i++;var a=i;for(;i<u;){var c=parseInt(n[i++],e);if(!(0<=c))break;f=f*e+c,o=o*e+Math.floor(f/k),f%=k}a&&(o=~o,f?f=k-f:o++);y(t,r+s,o),y(t,r+l,f)}(r,n,e,i||10):j(e,i)?S(r,n,e,i):"number"==typeof i?(y(r,n+s,e),y(r,n+l,i)):0<e?f(r,n,e):e<0?c(r,n,e):S(r,n,A,0)}(this,t,r,n,e):new v(t,r,n,e)}function d(){var t=this.buffer,r=this.offset,n=g(t,r+s),e=g(t,r+l);return a||(n|=0),n?n*k+e:e}function y(t,r,n){t[r+o]=255&n,n>>=8,t[r+u]=255&n,n>>=8,t[r+i]=255&n,n>>=8,t[r+e]=255&n}function g(t,r){return 16777216*t[r+e]+(t[r+i]<<16)+(t[r+u]<<8)+t[r+o]}}function B(t){var r=this.buffer,n=this.offset;return b=null,!1!==t&&0===n&&8===r.length&&e(r)?r:O(r,n)}function U(t){var r=this.buffer,n=this.offset;if(b=m,!1!==t&&0===n&&8===r.length&&i.isBuffer(r))return r;var e=new m(8);return S(e,0,r,n),e}function I(t){var r=this.buffer,n=this.offset,e=r.buffer;if(b=E,!1!==t&&0===n&&e instanceof x&&8===e.byteLength)return e;var i=new E(8);return S(i,0,r,n),i.buffer}function j(t,r){var n=t&&t.length;return r|=0,n&&r+8<=n&&"string"!=typeof t[r]}function S(t,r,n,e){r|=0,e|=0;for(var i=0;i<8;i++)t[r++]=255&n[e++]}function O(t,r){return Array.prototype.slice.call(t,r,r+8)}function D(t,r,n){for(var e=r+8;r<e;)t[--e]=255&n,n/=256}function R(t,r,n){var e=r+8;for(n++;r<e;)t[--e]=255&-n^255,n/=256}function C(t,r,n){for(var e=r+8;r<e;)t[r++]=255&n,n/=256}function P(t,r,n){var e=r+8;for(n++;r<e;)t[r++]=255&-n^255,n/=256}t("Uint64BE",!0,!0),t("Int64BE",!0,!1),t("Uint64LE",!1,!0),t("Int64LE",!1,!1)}("object"==typeof n&&"string"!=typeof n.nodeName?n:this||{})}).call(this,t("buffer").Buffer)},{buffer:5}],10:[function(t,r,n){var e={}.toString;r.exports=Array.isArray||function(t){return"[object Array]"==e.call(t)}},{}],11:[function(t,F,$){(function(W){(function(){var to,ro="Expected a function",no="__lodash_hash_undefined__",eo="__lodash_placeholder__",io=128,uo=9007199254740991,oo=NaN,fo=4294967295,ao=[["ary",io],["bind",1],["bindKey",2],["curry",8],["curryRight",16],["flip",512],["partial",32],["partialRight",64],["rearg",256]],co="[object Arguments]",so="[object Array]",lo="[object Boolean]",ho="[object Date]",po="[object Error]",vo="[object Function]",yo="[object GeneratorFunction]",go="[object Map]",_o="[object Number]",bo="[object Object]",wo="[object Promise]",mo="[object RegExp]",Eo="[object Set]",xo="[object String]",Ao="[object Symbol]",ko="[object WeakMap]",Bo="[object ArrayBuffer]",Uo="[object DataView]",Io="[object Float32Array]",jo="[object Float64Array]",So="[object Int8Array]",Oo="[object Int16Array]",Do="[object Int32Array]",Ro="[object Uint8Array]",Co="[object Uint8ClampedArray]",Po="[object Uint16Array]",Lo="[object Uint32Array]",To=/\b__p \+= '';/g,zo=/\b(__p \+=) '' \+/g,Mo=/(__e\(.*?\)|\b__t\)) \+\n'';/g,No=/&(?:amp|lt|gt|quot|#39);/g,Wo=/[&<>"']/g,Fo=RegExp(No.source),$o=RegExp(Wo.source),qo=/<%-([\s\S]+?)%>/g,Vo=/<%([\s\S]+?)%>/g,Yo=/<%=([\s\S]+?)%>/g,Zo=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,Ko=/^\w*$/,Go=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,Jo=/[\\^$.*+?()[\]{}|]/g,Ho=RegExp(Jo.source),Xo=/^\s+|\s+$/g,Qo=/^\s+/,tf=/\s+$/,rf=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,nf=/\{\n\/\* \[wrapped with (.+)\] \*/,ef=/,? & /,uf=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,of=/\\(\\)?/g,ff=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,af=/\w*$/,cf=/^[-+]0x[0-9a-f]+$/i,sf=/^0b[01]+$/i,lf=/^\[object .+?Constructor\]$/,hf=/^0o[0-7]+$/i,pf=/^(?:0|[1-9]\d*)$/,vf=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,df=/($^)/,yf=/['\n\r\u2028\u2029\\]/g,t="\\ud800-\\udfff",r="\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff",n="\\u2700-\\u27bf",e="a-z\\xdf-\\xf6\\xf8-\\xff",i="A-Z\\xc0-\\xd6\\xd8-\\xde",u="\\ufe0e\\ufe0f",o="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",f="['’]",a="["+t+"]",c="["+o+"]",s="["+r+"]",l="\\d+",h="["+n+"]",p="["+e+"]",v="[^"+t+o+l+n+e+i+"]",d="\\ud83c[\\udffb-\\udfff]",y="[^"+t+"]",g="(?:\\ud83c[\\udde6-\\uddff]){2}",_="[\\ud800-\\udbff][\\udc00-\\udfff]",b="["+i+"]",w="\\u200d",m="(?:"+p+"|"+v+")",E="(?:"+b+"|"+v+")",x="(?:['’](?:d|ll|m|re|s|t|ve))?",A="(?:['’](?:D|LL|M|RE|S|T|VE))?",k="(?:"+s+"|"+d+")"+"?",B="["+u+"]?",U=B+k+("(?:"+w+"(?:"+[y,g,_].join("|")+")"+B+k+")*"),I="(?:"+[h,g,_].join("|")+")"+U,j="(?:"+[y+s+"?",s,g,_,a].join("|")+")",gf=RegExp(f,"g"),_f=RegExp(s,"g"),S=RegExp(d+"(?="+d+")|"+j+U,"g"),bf=RegExp([b+"?"+p+"+"+x+"(?="+[c,b,"$"].join("|")+")",E+"+"+A+"(?="+[c,b+m,"$"].join("|")+")",b+"?"+m+"+"+x,b+"+"+A,"\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])","\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",l,I].join("|"),"g"),O=RegExp("["+w+t+r+u+"]"),wf=/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,mf=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],Ef=-1,xf={};xf[Io]=xf[jo]=xf[So]=xf[Oo]=xf[Do]=xf[Ro]=xf[Co]=xf[Po]=xf[Lo]=!0,xf[co]=xf[so]=xf[Bo]=xf[lo]=xf[Uo]=xf[ho]=xf[po]=xf[vo]=xf[go]=xf[_o]=xf[bo]=xf[mo]=xf[Eo]=xf[xo]=xf[ko]=!1;var Af={};Af[co]=Af[so]=Af[Bo]=Af[Uo]=Af[lo]=Af[ho]=Af[Io]=Af[jo]=Af[So]=Af[Oo]=Af[Do]=Af[go]=Af[_o]=Af[bo]=Af[mo]=Af[Eo]=Af[xo]=Af[Ao]=Af[Ro]=Af[Co]=Af[Po]=Af[Lo]=!0,Af[po]=Af[vo]=Af[ko]=!1;var D={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},kf=parseFloat,Bf=parseInt,R="object"==typeof W&&W&&W.Object===Object&&W,C="object"==typeof self&&self&&self.Object===Object&&self,Uf=R||C||Function("return this")(),P="object"==typeof $&&$&&!$.nodeType&&$,L=P&&"object"==typeof F&&F&&!F.nodeType&&F,If=L&&L.exports===P,T=If&&R.process,z=function(){try{var t=L&&L.require&&L.require("util").types;return t||T&&T.binding&&T.binding("util")}catch(t){}}(),jf=z&&z.isArrayBuffer,Sf=z&&z.isDate,Of=z&&z.isMap,Df=z&&z.isRegExp,Rf=z&&z.isSet,Cf=z&&z.isTypedArray;function Pf(t,r,n){switch(n.length){case 0:return t.call(r);case 1:return t.call(r,n[0]);case 2:return t.call(r,n[0],n[1]);case 3:return t.call(r,n[0],n[1],n[2])}return t.apply(r,n)}function Lf(t,r,n,e){for(var i=-1,u=null==t?0:t.length;++i<u;){var o=t[i];r(e,o,n(o),t)}return e}function Tf(t,r){for(var n=-1,e=null==t?0:t.length;++n<e&&!1!==r(t[n],n,t););return t}function zf(t,r){for(var n=null==t?0:t.length;n--&&!1!==r(t[n],n,t););return t}function Mf(t,r){for(var n=-1,e=null==t?0:t.length;++n<e;)if(!r(t[n],n,t))return!1;return!0}function Nf(t,r){for(var n=-1,e=null==t?0:t.length,i=0,u=[];++n<e;){var o=t[n];r(o,n,t)&&(u[i++]=o)}return u}function Wf(t,r){return!!(null==t?0:t.length)&&-1<Jf(t,r,0)}function Ff(t,r,n){for(var e=-1,i=null==t?0:t.length;++e<i;)if(n(r,t[e]))return!0;return!1}function $f(t,r){for(var n=-1,e=null==t?0:t.length,i=Array(e);++n<e;)i[n]=r(t[n],n,t);return i}function qf(t,r){for(var n=-1,e=r.length,i=t.length;++n<e;)t[i+n]=r[n];return t}function Vf(t,r,n,e){var i=-1,u=null==t?0:t.length;for(e&&u&&(n=t[++i]);++i<u;)n=r(n,t[i],i,t);return n}function Yf(t,r,n,e){var i=null==t?0:t.length;for(e&&i&&(n=t[--i]);i--;)n=r(n,t[i],i,t);return n}function Zf(t,r){for(var n=-1,e=null==t?0:t.length;++n<e;)if(r(t[n],n,t))return!0;return!1}var M=ta("length");function Kf(t,e,r){var i;return r(t,function(t,r,n){if(e(t,r,n))return i=r,!1}),i}function Gf(t,r,n,e){for(var i=t.length,u=n+(e?1:-1);e?u--:++u<i;)if(r(t[u],u,t))return u;return-1}function Jf(t,r,n){return r==r?function(t,r,n){var e=n-1,i=t.length;for(;++e<i;)if(t[e]===r)return e;return-1}(t,r,n):Gf(t,Xf,n)}function Hf(t,r,n,e){for(var i=n-1,u=t.length;++i<u;)if(e(t[i],r))return i;return-1}function Xf(t){return t!=t}function Qf(t,r){var n=null==t?0:t.length;return n?na(t,r)/n:oo}function ta(r){return function(t){return null==t?to:t[r]}}function N(r){return function(t){return null==r?to:r[t]}}function ra(t,e,i,u,r){return r(t,function(t,r,n){i=u?(u=!1,t):e(i,t,r,n)}),i}function na(t,r){for(var n,e=-1,i=t.length;++e<i;){var u=r(t[e]);u!==to&&(n=n===to?u:n+u)}return n}function ea(t,r){for(var n=-1,e=Array(t);++n<t;)e[n]=r(n);return e}function ia(r){return function(t){return r(t)}}function ua(r,t){return $f(t,function(t){return r[t]})}function oa(t,r){return t.has(r)}function fa(t,r){for(var n=-1,e=t.length;++n<e&&-1<Jf(r,t[n],0););return n}function aa(t,r){for(var n=t.length;n--&&-1<Jf(r,t[n],0););return n}var ca=N({"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"s"}),sa=N({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"});function la(t){return"\\"+D[t]}function ha(t){return O.test(t)}function pa(t){var n=-1,e=Array(t.size);return t.forEach(function(t,r){e[++n]=[r,t]}),e}function va(r,n){return function(t){return r(n(t))}}function da(t,r){for(var n=-1,e=t.length,i=0,u=[];++n<e;){var o=t[n];o!==r&&o!==eo||(t[n]=eo,u[i++]=n)}return u}function ya(t,r){return"__proto__"==r?to:t[r]}function ga(t){var r=-1,n=Array(t.size);return t.forEach(function(t){n[++r]=t}),n}function _a(t){return ha(t)?function(t){var r=S.lastIndex=0;for(;S.test(t);)++r;return r}(t):M(t)}function ba(t){return ha(t)?t.match(S)||[]:t.split("")}var wa=N({"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"});var ma=function t(r){var n,I=(r=null==r?Uf:ma.defaults(Uf.Object(),r,ma.pick(Uf,mf))).Array,e=r.Date,i=r.Error,y=r.Function,u=r.Math,A=r.Object,g=r.RegExp,s=r.String,j=r.TypeError,o=I.prototype,f=y.prototype,l=A.prototype,a=r["__core-js_shared__"],c=f.toString,k=l.hasOwnProperty,h=0,p=(n=/[^.]+$/.exec(a&&a.keys&&a.keys.IE_PROTO||""))?"Symbol(src)_1."+n:"",v=l.toString,d=c.call(A),_=Uf._,b=g("^"+c.call(k).replace(Jo,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),w=If?r.Buffer:to,m=r.Symbol,E=r.Uint8Array,x=w?w.allocUnsafe:to,B=va(A.getPrototypeOf,A),U=A.create,S=l.propertyIsEnumerable,O=o.splice,D=m?m.isConcatSpreadable:to,R=m?m.iterator:to,C=m?m.toStringTag:to,P=function(){try{var t=Nn(A,"defineProperty");return t({},"",{}),t}catch(t){}}(),L=r.clearTimeout!==Uf.clearTimeout&&r.clearTimeout,T=e&&e.now!==Uf.Date.now&&e.now,z=r.setTimeout!==Uf.setTimeout&&r.setTimeout,M=u.ceil,N=u.floor,W=A.getOwnPropertySymbols,F=w?w.isBuffer:to,$=r.isFinite,q=o.join,V=va(A.keys,A),Y=u.max,Z=u.min,K=e.now,G=r.parseInt,J=u.random,H=o.reverse,X=Nn(r,"DataView"),Q=Nn(r,"Map"),tt=Nn(r,"Promise"),rt=Nn(r,"Set"),nt=Nn(r,"WeakMap"),et=Nn(A,"create"),it=nt&&new nt,ut={},ot=pe(X),ft=pe(Q),at=pe(tt),ct=pe(rt),st=pe(nt),lt=m?m.prototype:to,ht=lt?lt.valueOf:to,pt=lt?lt.toString:to;function vt(t){if(Si(t)&&!bi(t)&&!(t instanceof _t)){if(t instanceof gt)return t;if(k.call(t,"__wrapped__"))return ve(t)}return new gt(t)}var dt=function(){function n(){}return function(t){if(!ji(t))return{};if(U)return U(t);n.prototype=t;var r=new n;return n.prototype=to,r}}();function yt(){}function gt(t,r){this.__wrapped__=t,this.__actions__=[],this.__chain__=!!r,this.__index__=0,this.__values__=to}function _t(t){this.__wrapped__=t,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=fo,this.__views__=[]}function bt(t){var r=-1,n=null==t?0:t.length;for(this.clear();++r<n;){var e=t[r];this.set(e[0],e[1])}}function wt(t){var r=-1,n=null==t?0:t.length;for(this.clear();++r<n;){var e=t[r];this.set(e[0],e[1])}}function mt(t){var r=-1,n=null==t?0:t.length;for(this.clear();++r<n;){var e=t[r];this.set(e[0],e[1])}}function Et(t){var r=-1,n=null==t?0:t.length;for(this.__data__=new mt;++r<n;)this.add(t[r])}function xt(t){var r=this.__data__=new wt(t);this.size=r.size}function At(t,r){var n=bi(t),e=!n&&_i(t),i=!n&&!e&&xi(t),u=!n&&!e&&!i&&zi(t),o=n||e||i||u,f=o?ea(t.length,s):[],a=f.length;for(var c in t)!r&&!k.call(t,c)||o&&("length"==c||i&&("offset"==c||"parent"==c)||u&&("buffer"==c||"byteLength"==c||"byteOffset"==c)||Zn(c,a))||f.push(c);return f}function kt(t){var r=t.length;return r?t[Er(0,r-1)]:to}function Bt(t,r){return ae(en(t),Pt(r,0,t.length))}function Ut(t){return ae(en(t))}function It(t,r,n){(n===to||di(t[r],n))&&(n!==to||r in t)||Rt(t,r,n)}function jt(t,r,n){var e=t[r];k.call(t,r)&&di(e,n)&&(n!==to||r in t)||Rt(t,r,n)}function St(t,r){for(var n=t.length;n--;)if(di(t[n][0],r))return n;return-1}function Ot(t,e,i,u){return Nt(t,function(t,r,n){e(u,t,i(t),n)}),u}function Dt(t,r){return t&&un(r,ou(r),t)}function Rt(t,r,n){"__proto__"==r&&P?P(t,r,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[r]=n}function Ct(t,r){for(var n=-1,e=r.length,i=I(e),u=null==t;++n<e;)i[n]=u?to:ru(t,r[n]);return i}function Pt(t,r,n){return t==t&&(n!==to&&(t=t<=n?t:n),r!==to&&(t=r<=t?t:r)),t}function Lt(n,e,i,t,r,u){var o,f=1&e,a=2&e,c=4&e;if(i&&(o=r?i(n,t,r,u):i(n)),o!==to)return o;if(!ji(n))return n;var s,l,h,p,v,d,y,g,_,b=bi(n);if(b){if(g=(y=n).length,_=new y.constructor(g),g&&"string"==typeof y[0]&&k.call(y,"index")&&(_.index=y.index,_.input=y.input),o=_,!f)return en(n,o)}else{var w=$n(n),m=w==vo||w==yo;if(xi(n))return Hr(n,f);if(w==bo||w==co||m&&!r){if(o=a||m?{}:Vn(n),!f)return a?(d=h=n,p=(v=o)&&un(d,fu(d),v),un(h,Fn(h),p)):(l=Dt(o,s=n),un(s,Wn(s),l))}else{if(!Af[w])return r?n:{};o=function(t,r,n){var e,i,u,o,f,a=t.constructor;switch(r){case Bo:return Xr(t);case lo:case ho:return new a(+t);case Uo:return o=t,f=n?Xr(o.buffer):o.buffer,new o.constructor(f,o.byteOffset,o.byteLength);case Io:case jo:case So:case Oo:case Do:case Ro:case Co:case Po:case Lo:return Qr(t,n);case go:return new a;case _o:case xo:return new a(t);case mo:return(u=new(i=t).constructor(i.source,af.exec(i))).lastIndex=i.lastIndex,u;case Eo:return new a;case Ao:return e=t,ht?A(ht.call(e)):{}}}(n,w,f)}}u||(u=new xt);var E=u.get(n);if(E)return E;if(u.set(n,o),Pi(n))return n.forEach(function(t){o.add(Lt(t,e,i,t,n,u))}),o;if(Oi(n))return n.forEach(function(t,r){o.set(r,Lt(t,e,i,r,n,u))}),o;var x=b?to:(c?a?Rn:Dn:a?fu:ou)(n);return Tf(x||n,function(t,r){x&&(t=n[r=t]),jt(o,r,Lt(t,e,i,r,n,u))}),o}function Tt(t,r,n){var e=n.length;if(null==t)return!e;for(t=A(t);e--;){var i=n[e],u=r[i],o=t[i];if(o===to&&!(i in t)||!u(o))return!1}return!0}function zt(t,r,n){if("function"!=typeof t)throw new j(ro);return ie(function(){t.apply(to,n)},r)}function Mt(t,r,n,e){var i=-1,u=Wf,o=!0,f=t.length,a=[],c=r.length;if(!f)return a;n&&(r=$f(r,ia(n))),e?(u=Ff,o=!1):200<=r.length&&(u=oa,o=!1,r=new Et(r));t:for(;++i<f;){var s=t[i],l=null==n?s:n(s);if(s=e||0!==s?s:0,o&&l==l){for(var h=c;h--;)if(r[h]===l)continue t;a.push(s)}else u(r,l,e)||a.push(s)}return a}vt.templateSettings={escape:qo,evaluate:Vo,interpolate:Yo,variable:"",imports:{_:vt}},(vt.prototype=yt.prototype).constructor=vt,(gt.prototype=dt(yt.prototype)).constructor=gt,(_t.prototype=dt(yt.prototype)).constructor=_t,bt.prototype.clear=function(){this.__data__=et?et(null):{},this.size=0},bt.prototype.delete=function(t){var r=this.has(t)&&delete this.__data__[t];return this.size-=r?1:0,r},bt.prototype.get=function(t){var r=this.__data__;if(et){var n=r[t];return n===no?to:n}return k.call(r,t)?r[t]:to},bt.prototype.has=function(t){var r=this.__data__;return et?r[t]!==to:k.call(r,t)},bt.prototype.set=function(t,r){var n=this.__data__;return this.size+=this.has(t)?0:1,n[t]=et&&r===to?no:r,this},wt.prototype.clear=function(){this.__data__=[],this.size=0},wt.prototype.delete=function(t){var r=this.__data__,n=St(r,t);return!(n<0||(n==r.length-1?r.pop():O.call(r,n,1),--this.size,0))},wt.prototype.get=function(t){var r=this.__data__,n=St(r,t);return n<0?to:r[n][1]},wt.prototype.has=function(t){return-1<St(this.__data__,t)},wt.prototype.set=function(t,r){var n=this.__data__,e=St(n,t);return e<0?(++this.size,n.push([t,r])):n[e][1]=r,this},mt.prototype.clear=function(){this.size=0,this.__data__={hash:new bt,map:new(Q||wt),string:new bt}},mt.prototype.delete=function(t){var r=zn(this,t).delete(t);return this.size-=r?1:0,r},mt.prototype.get=function(t){return zn(this,t).get(t)},mt.prototype.has=function(t){return zn(this,t).has(t)},mt.prototype.set=function(t,r){var n=zn(this,t),e=n.size;return n.set(t,r),this.size+=n.size==e?0:1,this},Et.prototype.add=Et.prototype.push=function(t){return this.__data__.set(t,no),this},Et.prototype.has=function(t){return this.__data__.has(t)},xt.prototype.clear=function(){this.__data__=new wt,this.size=0},xt.prototype.delete=function(t){var r=this.__data__,n=r.delete(t);return this.size=r.size,n},xt.prototype.get=function(t){return this.__data__.get(t)},xt.prototype.has=function(t){return this.__data__.has(t)},xt.prototype.set=function(t,r){var n=this.__data__;if(n instanceof wt){var e=n.__data__;if(!Q||e.length<199)return e.push([t,r]),this.size=++n.size,this;n=this.__data__=new mt(e)}return n.set(t,r),this.size=n.size,this};var Nt=an(Kt),Wt=an(Gt,!0);function Ft(t,e){var i=!0;return Nt(t,function(t,r,n){return i=!!e(t,r,n)}),i}function $t(t,r,n){for(var e=-1,i=t.length;++e<i;){var u=t[e],o=r(u);if(null!=o&&(f===to?o==o&&!Ti(o):n(o,f)))var f=o,a=u}return a}function qt(t,e){var i=[];return Nt(t,function(t,r,n){e(t,r,n)&&i.push(t)}),i}function Vt(t,r,n,e,i){var u=-1,o=t.length;for(n||(n=Yn),i||(i=[]);++u<o;){var f=t[u];0<r&&n(f)?1<r?Vt(f,r-1,n,e,i):qf(i,f):e||(i[i.length]=f)}return i}var Yt=cn(),Zt=cn(!0);function Kt(t,r){return t&&Yt(t,r,ou)}function Gt(t,r){return t&&Zt(t,r,ou)}function Jt(r,t){return Nf(t,function(t){return Bi(r[t])})}function Ht(t,r){for(var n=0,e=(r=Zr(r,t)).length;null!=t&&n<e;)t=t[he(r[n++])];return n&&n==e?t:to}function Xt(t,r,n){var e=r(t);return bi(t)?e:qf(e,n(t))}function Qt(t){return null==t?t===to?"[object Undefined]":"[object Null]":C&&C in A(t)?function(t){var r=k.call(t,C),n=t[C];try{t[C]=to;var e=!0}catch(t){}var i=v.call(t);return e&&(r?t[C]=n:delete t[C]),i}(t):(r=t,v.call(r));var r}function tr(t,r){return r<t}function rr(t,r){return null!=t&&k.call(t,r)}function nr(t,r){return null!=t&&r in A(t)}function er(t,r,n){for(var e=n?Ff:Wf,i=t[0].length,u=t.length,o=u,f=I(u),a=1/0,c=[];o--;){var s=t[o];o&&r&&(s=$f(s,ia(r))),a=Z(s.length,a),f[o]=!n&&(r||120<=i&&120<=s.length)?new Et(o&&s):to}s=t[0];var l=-1,h=f[0];t:for(;++l<i&&c.length<a;){var p=s[l],v=r?r(p):p;if(p=n||0!==p?p:0,!(h?oa(h,v):e(c,v,n))){for(o=u;--o;){var d=f[o];if(!(d?oa(d,v):e(t[o],v,n)))continue t}h&&h.push(v),c.push(p)}}return c}function ir(t,r,n){var e=null==(t=ne(t,r=Zr(r,t)))?t:t[he(ke(r))];return null==e?to:Pf(e,t,n)}function ur(t){return Si(t)&&Qt(t)==co}function or(t,r,n,e,i){return t===r||(null==t||null==r||!Si(t)&&!Si(r)?t!=t&&r!=r:function(t,r,n,e,i,u){var o=bi(t),f=bi(r),a=o?so:$n(t),c=f?so:$n(r),s=(a=a==co?bo:a)==bo,l=(c=c==co?bo:c)==bo,h=a==c;if(h&&xi(t)){if(!xi(r))return!1;s=!(o=!0)}if(h&&!s)return u||(u=new xt),o||zi(t)?Sn(t,r,n,e,i,u):function(t,r,n,e,i,u,o){switch(n){case Uo:if(t.byteLength!=r.byteLength||t.byteOffset!=r.byteOffset)return!1;t=t.buffer,r=r.buffer;case Bo:return!(t.byteLength!=r.byteLength||!u(new E(t),new E(r)));case lo:case ho:case _o:return di(+t,+r);case po:return t.name==r.name&&t.message==r.message;case mo:case xo:return t==r+"";case go:var f=pa;case Eo:var a=1&e;if(f||(f=ga),t.size!=r.size&&!a)return!1;var c=o.get(t);if(c)return c==r;e|=2,o.set(t,r);var s=Sn(f(t),f(r),e,i,u,o);return o.delete(t),s;case Ao:if(ht)return ht.call(t)==ht.call(r)}return!1}(t,r,a,n,e,i,u);if(!(1&n)){var p=s&&k.call(t,"__wrapped__"),v=l&&k.call(r,"__wrapped__");if(p||v){var d=p?t.value():t,y=v?r.value():r;return u||(u=new xt),i(d,y,n,e,u)}}return!!h&&(u||(u=new xt),function(t,r,n,e,i,u){var o=1&n,f=Dn(t),a=f.length,c=Dn(r).length;if(a!=c&&!o)return!1;for(var s=a;s--;){var l=f[s];if(!(o?l in r:k.call(r,l)))return!1}var h=u.get(t);if(h&&u.get(r))return h==r;var p=!0;u.set(t,r),u.set(r,t);for(var v=o;++s<a;){l=f[s];var d=t[l],y=r[l];if(e)var g=o?e(y,d,l,r,t,u):e(d,y,l,t,r,u);if(!(g===to?d===y||i(d,y,n,e,u):g)){p=!1;break}v||(v="constructor"==l)}if(p&&!v){var _=t.constructor,b=r.constructor;_!=b&&"constructor"in t&&"constructor"in r&&!("function"==typeof _&&_ instanceof _&&"function"==typeof b&&b instanceof b)&&(p=!1)}return u.delete(t),u.delete(r),p}(t,r,n,e,i,u))}(t,r,n,e,or,i))}function fr(t,r,n,e){var i=n.length,u=i,o=!e;if(null==t)return!u;for(t=A(t);i--;){var f=n[i];if(o&&f[2]?f[1]!==t[f[0]]:!(f[0]in t))return!1}for(;++i<u;){var a=(f=n[i])[0],c=t[a],s=f[1];if(o&&f[2]){if(c===to&&!(a in t))return!1}else{var l=new xt;if(e)var h=e(c,s,a,t,r,l);if(!(h===to?or(s,c,3,e,l):h))return!1}}return!0}function ar(t){return!(!ji(t)||(r=t,p&&p in r))&&(Bi(t)?b:lf).test(pe(t));var r}function cr(t){return"function"==typeof t?t:null==t?Du:"object"==typeof t?bi(t)?dr(t[0],t[1]):vr(t):Wu(t)}function sr(t){if(!Xn(t))return V(t);var r=[];for(var n in A(t))k.call(t,n)&&"constructor"!=n&&r.push(n);return r}function lr(t){if(!ji(t))return function(t){var r=[];if(null!=t)for(var n in A(t))r.push(n);return r}(t);var r=Xn(t),n=[];for(var e in t)("constructor"!=e||!r&&k.call(t,e))&&n.push(e);return n}function hr(t,r){return t<r}function pr(t,e){var i=-1,u=mi(t)?I(t.length):[];return Nt(t,function(t,r,n){u[++i]=e(t,r,n)}),u}function vr(r){var n=Mn(r);return 1==n.length&&n[0][2]?te(n[0][0],n[0][1]):function(t){return t===r||fr(t,r,n)}}function dr(n,e){return Gn(n)&&Qn(e)?te(he(n),e):function(t){var r=ru(t,n);return r===to&&r===e?nu(t,n):or(e,r,3)}}function yr(e,i,u,o,f){e!==i&&Yt(i,function(t,r){if(ji(t))f||(f=new xt),function(t,r,n,e,i,u,o){var f=ya(t,n),a=ya(r,n),c=o.get(a);if(c)return It(t,n,c);var s=u?u(f,a,n+"",t,r,o):to,l=s===to;if(l){var h=bi(a),p=!h&&xi(a),v=!h&&!p&&zi(a);s=a,h||p||v?s=bi(f)?f:Ei(f)?en(f):p?Hr(a,!(l=!1)):v?Qr(a,!(l=!1)):[]:Ri(a)||_i(a)?_i(s=f)?s=Yi(f):(!ji(f)||e&&Bi(f))&&(s=Vn(a)):l=!1}l&&(o.set(a,s),i(s,a,e,u,o),o.delete(a)),It(t,n,s)}(e,i,r,u,yr,o,f);else{var n=o?o(ya(e,r),t,r+"",e,i,f):to;n===to&&(n=t),It(e,r,n)}},fu)}function gr(t,r){var n=t.length;if(n)return Zn(r+=r<0?n:0,n)?t[r]:to}function _r(t,e,n){var i=-1;return e=$f(e.length?e:[Du],ia(Tn())),function(t,r){var n=t.length;for(t.sort(r);n--;)t[n]=t[n].value;return t}(pr(t,function(r,t,n){return{criteria:$f(e,function(t){return t(r)}),index:++i,value:r}}),function(t,r){return function(t,r,n){for(var e=-1,i=t.criteria,u=r.criteria,o=i.length,f=n.length;++e<o;){var a=tn(i[e],u[e]);if(a){if(f<=e)return a;var c=n[e];return a*("desc"==c?-1:1)}}return t.index-r.index}(t,r,n)})}function br(t,r,n){for(var e=-1,i=r.length,u={};++e<i;){var o=r[e],f=Ht(t,o);n(f,o)&&Ur(u,Zr(o,t),f)}return u}function wr(t,r,n,e){var i=e?Hf:Jf,u=-1,o=r.length,f=t;for(t===r&&(r=en(r)),n&&(f=$f(t,ia(n)));++u<o;)for(var a=0,c=r[u],s=n?n(c):c;-1<(a=i(f,s,a,e));)f!==t&&O.call(f,a,1),O.call(t,a,1);return t}function mr(t,r){for(var n=t?r.length:0,e=n-1;n--;){var i=r[n];if(n==e||i!==u){var u=i;Zn(i)?O.call(t,i,1):Mr(t,i)}}return t}function Er(t,r){return t+N(J()*(r-t+1))}function xr(t,r){var n="";if(!t||r<1||uo<r)return n;for(;r%2&&(n+=t),(r=N(r/2))&&(t+=t),r;);return n}function Ar(t,r){return ue(re(t,r,Du),t+"")}function kr(t){return kt(du(t))}function Br(t,r){var n=du(t);return ae(n,Pt(r,0,n.length))}function Ur(t,r,n,e){if(!ji(t))return t;for(var i=-1,u=(r=Zr(r,t)).length,o=u-1,f=t;null!=f&&++i<u;){var a=he(r[i]),c=n;if(i!=o){var s=f[a];(c=e?e(s,a,f):to)===to&&(c=ji(s)?s:Zn(r[i+1])?[]:{})}jt(f,a,c),f=f[a]}return t}var Ir=it?function(t,r){return it.set(t,r),t}:Du,jr=P?function(t,r){return P(t,"toString",{configurable:!0,enumerable:!1,value:ju(r),writable:!0})}:Du;function Sr(t){return ae(du(t))}function Or(t,r,n){var e=-1,i=t.length;r<0&&(r=i<-r?0:i+r),(n=i<n?i:n)<0&&(n+=i),i=n<r?0:n-r>>>0,r>>>=0;for(var u=I(i);++e<i;)u[e]=t[e+r];return u}function Dr(t,e){var i;return Nt(t,function(t,r,n){return!(i=e(t,r,n))}),!!i}function Rr(t,r,n){var e=0,i=null==t?e:t.length;if("number"==typeof r&&r==r&&i<=2147483647){for(;e<i;){var u=e+i>>>1,o=t[u];null!==o&&!Ti(o)&&(n?o<=r:o<r)?e=u+1:i=u}return i}return Cr(t,r,Du,n)}function Cr(t,r,n,e){r=n(r);for(var i=0,u=null==t?0:t.length,o=r!=r,f=null===r,a=Ti(r),c=r===to;i<u;){var s=N((i+u)/2),l=n(t[s]),h=l!==to,p=null===l,v=l==l,d=Ti(l);if(o)var y=e||v;else y=c?v&&(e||h):f?v&&h&&(e||!p):a?v&&h&&!p&&(e||!d):!p&&!d&&(e?l<=r:l<r);y?i=s+1:u=s}return Z(u,4294967294)}function Pr(t,r){for(var n=-1,e=t.length,i=0,u=[];++n<e;){var o=t[n],f=r?r(o):o;if(!n||!di(f,a)){var a=f;u[i++]=0===o?0:o}}return u}function Lr(t){return"number"==typeof t?t:Ti(t)?oo:+t}function Tr(t){if("string"==typeof t)return t;if(bi(t))return $f(t,Tr)+"";if(Ti(t))return pt?pt.call(t):"";var r=t+"";return"0"==r&&1/t==-1/0?"-0":r}function zr(t,r,n){var e=-1,i=Wf,u=t.length,o=!0,f=[],a=f;if(n)o=!1,i=Ff;else if(200<=u){var c=r?null:An(t);if(c)return ga(c);o=!1,i=oa,a=new Et}else a=r?[]:f;t:for(;++e<u;){var s=t[e],l=r?r(s):s;if(s=n||0!==s?s:0,o&&l==l){for(var h=a.length;h--;)if(a[h]===l)continue t;r&&a.push(l),f.push(s)}else i(a,l,n)||(a!==f&&a.push(l),f.push(s))}return f}function Mr(t,r){return null==(t=ne(t,r=Zr(r,t)))||delete t[he(ke(r))]}function Nr(t,r,n,e){return Ur(t,r,n(Ht(t,r)),e)}function Wr(t,r,n,e){for(var i=t.length,u=e?i:-1;(e?u--:++u<i)&&r(t[u],u,t););return n?Or(t,e?0:u,e?u+1:i):Or(t,e?u+1:0,e?i:u)}function Fr(t,r){var n=t;return n instanceof _t&&(n=n.value()),Vf(r,function(t,r){return r.func.apply(r.thisArg,qf([t],r.args))},n)}function $r(t,r,n){var e=t.length;if(e<2)return e?zr(t[0]):[];for(var i=-1,u=I(e);++i<e;)for(var o=t[i],f=-1;++f<e;)f!=i&&(u[i]=Mt(u[i]||o,t[f],r,n));return zr(Vt(u,1),r,n)}function qr(t,r,n){for(var e=-1,i=t.length,u=r.length,o={};++e<i;){var f=e<u?r[e]:to;n(o,t[e],f)}return o}function Vr(t){return Ei(t)?t:[]}function Yr(t){return"function"==typeof t?t:Du}function Zr(t,r){return bi(t)?t:Gn(t,r)?[t]:le(Zi(t))}var Kr=Ar;function Gr(t,r,n){var e=t.length;return n=n===to?e:n,!r&&e<=n?t:Or(t,r,n)}var Jr=L||function(t){return Uf.clearTimeout(t)};function Hr(t,r){if(r)return t.slice();var n=t.length,e=x?x(n):new t.constructor(n);return t.copy(e),e}function Xr(t){var r=new t.constructor(t.byteLength);return new E(r).set(new E(t)),r}function Qr(t,r){var n=r?Xr(t.buffer):t.buffer;return new t.constructor(n,t.byteOffset,t.length)}function tn(t,r){if(t!==r){var n=t!==to,e=null===t,i=t==t,u=Ti(t),o=r!==to,f=null===r,a=r==r,c=Ti(r);if(!f&&!c&&!u&&r<t||u&&o&&a&&!f&&!c||e&&o&&a||!n&&a||!i)return 1;if(!e&&!u&&!c&&t<r||c&&n&&i&&!e&&!u||f&&n&&i||!o&&i||!a)return-1}return 0}function rn(t,r,n,e){for(var i=-1,u=t.length,o=n.length,f=-1,a=r.length,c=Y(u-o,0),s=I(a+c),l=!e;++f<a;)s[f]=r[f];for(;++i<o;)(l||i<u)&&(s[n[i]]=t[i]);for(;c--;)s[f++]=t[i++];return s}function nn(t,r,n,e){for(var i=-1,u=t.length,o=-1,f=n.length,a=-1,c=r.length,s=Y(u-f,0),l=I(s+c),h=!e;++i<s;)l[i]=t[i];for(var p=i;++a<c;)l[p+a]=r[a];for(;++o<f;)(h||i<u)&&(l[p+n[o]]=t[i++]);return l}function en(t,r){var n=-1,e=t.length;for(r||(r=I(e));++n<e;)r[n]=t[n];return r}function un(t,r,n,e){var i=!n;n||(n={});for(var u=-1,o=r.length;++u<o;){var f=r[u],a=e?e(n[f],t[f],f,n,t):to;a===to&&(a=t[f]),i?Rt(n,f,a):jt(n,f,a)}return n}function on(i,u){return function(t,r){var n=bi(t)?Lf:Ot,e=u?u():{};return n(t,i,Tn(r,2),e)}}function fn(f){return Ar(function(t,r){var n=-1,e=r.length,i=1<e?r[e-1]:to,u=2<e?r[2]:to;for(i=3<f.length&&"function"==typeof i?(e--,i):to,u&&Kn(r[0],r[1],u)&&(i=e<3?to:i,e=1),t=A(t);++n<e;){var o=r[n];o&&f(t,o,n,i)}return t})}function an(u,o){return function(t,r){if(null==t)return t;if(!mi(t))return u(t,r);for(var n=t.length,e=o?n:-1,i=A(t);(o?e--:++e<n)&&!1!==r(i[e],e,i););return t}}function cn(a){return function(t,r,n){for(var e=-1,i=A(t),u=n(t),o=u.length;o--;){var f=u[a?o:++e];if(!1===r(i[f],f,i))break}return t}}function sn(i){return function(t){var r=ha(t=Zi(t))?ba(t):to,n=r?r[0]:t.charAt(0),e=r?Gr(r,1).join(""):t.slice(1);return n[i]()+e}}function ln(r){return function(t){return Vf(Bu(_u(t).replace(gf,"")),r,"")}}function hn(e){return function(){var t=arguments;switch(t.length){case 0:return new e;case 1:return new e(t[0]);case 2:return new e(t[0],t[1]);case 3:return new e(t[0],t[1],t[2]);case 4:return new e(t[0],t[1],t[2],t[3]);case 5:return new e(t[0],t[1],t[2],t[3],t[4]);case 6:return new e(t[0],t[1],t[2],t[3],t[4],t[5]);case 7:return new e(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var r=dt(e.prototype),n=e.apply(r,t);return ji(n)?n:r}}function pn(o){return function(t,r,n){var e=A(t);if(!mi(t)){var i=Tn(r,3);t=ou(t),r=function(t){return i(e[t],t,e)}}var u=o(t,r,n);return-1<u?e[i?t[u]:u]:to}}function vn(a){return On(function(i){var u=i.length,t=u,r=gt.prototype.thru;for(a&&i.reverse();t--;){var n=i[t];if("function"!=typeof n)throw new j(ro);if(r&&!o&&"wrapper"==Pn(n))var o=new gt([],!0)}for(t=o?t:u;++t<u;){var e=Pn(n=i[t]),f="wrapper"==e?Cn(n):to;o=f&&Jn(f[0])&&424==f[1]&&!f[4].length&&1==f[9]?o[Pn(f[0])].apply(o,f[3]):1==n.length&&Jn(n)?o[e]():o.thru(n)}return function(){var t=arguments,r=t[0];if(o&&1==t.length&&bi(r))return o.plant(r).value();for(var n=0,e=u?i[n].apply(this,t):r;++n<u;)e=i[n].call(this,e);return e}})}function dn(c,s,l,h,p,v,d,y,g,_){var b=s&io,w=1&s,m=2&s,E=24&s,x=512&s,A=m?to:hn(c);return function t(){for(var r=arguments.length,n=I(r),e=r;e--;)n[e]=arguments[e];if(E)var i=Ln(t),u=function(t,r){for(var n=t.length,e=0;n--;)t[n]===r&&++e;return e}(n,i);if(h&&(n=rn(n,h,p,E)),v&&(n=nn(n,v,d,E)),r-=u,E&&r<_){var o=da(n,i);return En(c,s,dn,t.placeholder,l,n,o,y,g,_-r)}var f=w?l:this,a=m?f[c]:c;return r=n.length,y?n=function(t,r){for(var n=t.length,e=Z(r.length,n),i=en(t);e--;){var u=r[e];t[e]=Zn(u,n)?i[u]:to}return t}(n,y):x&&1<r&&n.reverse(),b&&g<r&&(n.length=g),this&&this!==Uf&&this instanceof t&&(a=A||hn(a)),a.apply(f,n)}}function yn(o,f){return function(t,r){return n=t,e=o,i=f(r),u={},Kt(n,function(t,r,n){e(u,i(t),r,n)}),u;var n,e,i,u}}function gn(e,i){return function(t,r){var n;if(t===to&&r===to)return i;if(t!==to&&(n=t),r!==to){if(n===to)return r;"string"==typeof t||"string"==typeof r?(t=Tr(t),r=Tr(r)):(t=Lr(t),r=Lr(r)),n=e(t,r)}return n}}function _n(e){return On(function(t){return t=$f(t,ia(Tn())),Ar(function(r){var n=this;return e(t,function(t){return Pf(t,n,r)})})})}function bn(t,r){var n=(r=r===to?" ":Tr(r)).length;if(n<2)return n?xr(r,t):r;var e=xr(r,M(t/_a(r)));return ha(r)?Gr(ba(e),0,t).join(""):e.slice(0,t)}function wn(e){return function(t,r,n){return n&&"number"!=typeof n&&Kn(t,r,n)&&(r=n=to),t=Fi(t),r===to?(r=t,t=0):r=Fi(r),function(t,r,n,e){for(var i=-1,u=Y(M((r-t)/(n||1)),0),o=I(u);u--;)o[e?u:++i]=t,t+=n;return o}(t,r,n=n===to?t<r?1:-1:Fi(n),e)}}function mn(n){return function(t,r){return"string"==typeof t&&"string"==typeof r||(t=Vi(t),r=Vi(r)),n(t,r)}}function En(t,r,n,e,i,u,o,f,a,c){var s=8&r;r|=s?32:64,4&(r&=~(s?64:32))||(r&=-4);var l=[t,r,i,s?u:to,s?o:to,s?to:u,s?to:o,f,a,c],h=n.apply(to,l);return Jn(t)&&ee(h,l),h.placeholder=e,oe(h,t,r)}function xn(t){var e=u[t];return function(t,r){if(t=Vi(t),r=null==r?0:Z($i(r),292)){var n=(Zi(t)+"e").split("e");return+((n=(Zi(e(n[0]+"e"+(+n[1]+r)))+"e").split("e"))[0]+"e"+(+n[1]-r))}return e(t)}}var An=rt&&1/ga(new rt([,-0]))[1]==1/0?function(t){return new rt(t)}:Tu;function kn(o){return function(t){var r,n,e,i,u=$n(t);return u==go?pa(t):u==Eo?(r=t,n=-1,e=Array(r.size),r.forEach(function(t){e[++n]=[t,t]}),e):$f(o(i=t),function(t){return[t,i[t]]})}}function Bn(t,r,n,e,i,u,o,f){var a=2&r;if(!a&&"function"!=typeof t)throw new j(ro);var c=e?e.length:0;if(c||(r&=-97,e=i=to),o=o===to?o:Y($i(o),0),f=f===to?f:$i(f),c-=i?i.length:0,64&r){var s=e,l=i;e=i=to}var h,p,v,d,y,g,_,b,w,m,E,x,A,k=a?to:Cn(t),B=[t,r,n,e,i,s,l,u,o,f];if(k&&function(t,r){var n=t[1],e=r[1],i=n|e,u=i<131,o=e==io&&8==n||e==io&&256==n&&t[7].length<=r[8]||384==e&&r[7].length<=r[8]&&8==n;if(u||o){1&e&&(t[2]=r[2],i|=1&n?0:4);var f=r[3];if(f){var a=t[3];t[3]=a?rn(a,f,r[4]):f,t[4]=a?da(t[3],eo):r[4]}(f=r[5])&&(a=t[5],t[5]=a?nn(a,f,r[6]):f,t[6]=a?da(t[5],eo):r[6]),(f=r[7])&&(t[7]=f),e&io&&(t[8]=null==t[8]?r[8]:Z(t[8],r[8])),null==t[9]&&(t[9]=r[9]),t[0]=r[0],t[1]=i}}(B,k),t=B[0],r=B[1],n=B[2],e=B[3],i=B[4],!(f=B[9]=B[9]===to?a?0:t.length:Y(B[9]-c,0))&&24&r&&(r&=-25),r&&1!=r)8==r||16==r?(_=r,b=f,w=hn(g=t),U=function t(){for(var r=arguments.length,n=I(r),e=r,i=Ln(t);e--;)n[e]=arguments[e];var u=r<3&&n[0]!==i&&n[r-1]!==i?[]:da(n,i);return(r-=u.length)<b?En(g,_,dn,t.placeholder,to,n,u,to,to,b-r):Pf(this&&this!==Uf&&this instanceof t?w:g,this,n)}):32!=r&&33!=r||i.length?U=dn.apply(to,B):(p=n,v=e,d=1&r,y=hn(h=t),U=function t(){for(var r=-1,n=arguments.length,e=-1,i=v.length,u=I(i+n),o=this&&this!==Uf&&this instanceof t?y:h;++e<i;)u[e]=v[e];for(;n--;)u[e++]=arguments[++r];return Pf(o,d?p:this,u)});else var U=(E=n,x=1&r,A=hn(m=t),function t(){return(this&&this!==Uf&&this instanceof t?A:m).apply(x?E:this,arguments)});return oe((k?Ir:ee)(U,B),t,r)}function Un(t,r,n,e){return t===to||di(t,l[n])&&!k.call(e,n)?r:t}function In(t,r,n,e,i,u){return ji(t)&&ji(r)&&(u.set(r,t),yr(t,r,to,In,u),u.delete(r)),t}function jn(t){return Ri(t)?to:t}function Sn(t,r,n,e,i,u){var o=1&n,f=t.length,a=r.length;if(f!=a&&!(o&&f<a))return!1;var c=u.get(t);if(c&&u.get(r))return c==r;var s=-1,l=!0,h=2&n?new Et:to;for(u.set(t,r),u.set(r,t);++s<f;){var p=t[s],v=r[s];if(e)var d=o?e(v,p,s,r,t,u):e(p,v,s,t,r,u);if(d!==to){if(d)continue;l=!1;break}if(h){if(!Zf(r,function(t,r){if(!oa(h,r)&&(p===t||i(p,t,n,e,u)))return h.push(r)})){l=!1;break}}else if(p!==v&&!i(p,v,n,e,u)){l=!1;break}}return u.delete(t),u.delete(r),l}function On(t){return ue(re(t,to,we),t+"")}function Dn(t){return Xt(t,ou,Wn)}function Rn(t){return Xt(t,fu,Fn)}var Cn=it?function(t){return it.get(t)}:Tu;function Pn(t){for(var r=t.name+"",n=ut[r],e=k.call(ut,r)?n.length:0;e--;){var i=n[e],u=i.func;if(null==u||u==t)return i.name}return r}function Ln(t){return(k.call(vt,"placeholder")?vt:t).placeholder}function Tn(){var t=vt.iteratee||Ru;return t=t===Ru?cr:t,arguments.length?t(arguments[0],arguments[1]):t}function zn(t,r){var n,e,i=t.__data__;return("string"==(e=typeof(n=r))||"number"==e||"symbol"==e||"boolean"==e?"__proto__"!==n:null===n)?i["string"==typeof r?"string":"hash"]:i.map}function Mn(t){for(var r=ou(t),n=r.length;n--;){var e=r[n],i=t[e];r[n]=[e,i,Qn(i)]}return r}function Nn(t,r){var n,e,i=(e=r,null==(n=t)?to:n[e]);return ar(i)?i:to}var Wn=W?function(r){return null==r?[]:(r=A(r),Nf(W(r),function(t){return S.call(r,t)}))}:qu,Fn=W?function(t){for(var r=[];t;)qf(r,Wn(t)),t=B(t);return r}:qu,$n=Qt;function qn(t,r,n){for(var e=-1,i=(r=Zr(r,t)).length,u=!1;++e<i;){var o=he(r[e]);if(!(u=null!=t&&n(t,o)))break;t=t[o]}return u||++e!=i?u:!!(i=null==t?0:t.length)&&Ii(i)&&Zn(o,i)&&(bi(t)||_i(t))}function Vn(t){return"function"!=typeof t.constructor||Xn(t)?{}:dt(B(t))}function Yn(t){return bi(t)||_i(t)||!!(D&&t&&t[D])}function Zn(t,r){var n=typeof t;return!!(r=null==r?uo:r)&&("number"==n||"symbol"!=n&&pf.test(t))&&-1<t&&t%1==0&&t<r}function Kn(t,r,n){if(!ji(n))return!1;var e=typeof r;return!!("number"==e?mi(n)&&Zn(r,n.length):"string"==e&&r in n)&&di(n[r],t)}function Gn(t,r){if(bi(t))return!1;var n=typeof t;return!("number"!=n&&"symbol"!=n&&"boolean"!=n&&null!=t&&!Ti(t))||Ko.test(t)||!Zo.test(t)||null!=r&&t in A(r)}function Jn(t){var r=Pn(t),n=vt[r];if("function"!=typeof n||!(r in _t.prototype))return!1;if(t===n)return!0;var e=Cn(n);return!!e&&t===e[0]}(X&&$n(new X(new ArrayBuffer(1)))!=Uo||Q&&$n(new Q)!=go||tt&&$n(tt.resolve())!=wo||rt&&$n(new rt)!=Eo||nt&&$n(new nt)!=ko)&&($n=function(t){var r=Qt(t),n=r==bo?t.constructor:to,e=n?pe(n):"";if(e)switch(e){case ot:return Uo;case ft:return go;case at:return wo;case ct:return Eo;case st:return ko}return r});var Hn=a?Bi:Vu;function Xn(t){var r=t&&t.constructor;return t===("function"==typeof r&&r.prototype||l)}function Qn(t){return t==t&&!ji(t)}function te(r,n){return function(t){return null!=t&&t[r]===n&&(n!==to||r in A(t))}}function re(u,o,f){return o=Y(o===to?u.length-1:o,0),function(){for(var t=arguments,r=-1,n=Y(t.length-o,0),e=I(n);++r<n;)e[r]=t[o+r];r=-1;for(var i=I(o+1);++r<o;)i[r]=t[r];return i[o]=f(e),Pf(u,this,i)}}function ne(t,r){return r.length<2?t:Ht(t,Or(r,0,-1))}var ee=fe(Ir),ie=z||function(t,r){return Uf.setTimeout(t,r)},ue=fe(jr);function oe(t,r,n){var e,i,u,o=r+"";return ue(t,function(t,r){var n=r.length;if(!n)return t;var e=n-1;return r[e]=(1<n?"& ":"")+r[e],r=r.join(2<n?", ":" "),t.replace(rf,"{\n/* [wrapped with "+r+"] */\n")}(o,(u=o.match(nf),e=u?u[1].split(ef):[],i=n,Tf(ao,function(t){var r="_."+t[0];i&t[1]&&!Wf(e,r)&&e.push(r)}),e.sort())))}function fe(n){var e=0,i=0;return function(){var t=K(),r=16-(t-i);if(i=t,0<r){if(800<=++e)return arguments[0]}else e=0;return n.apply(to,arguments)}}function ae(t,r){var n=-1,e=t.length,i=e-1;for(r=r===to?e:r;++n<r;){var u=Er(n,i),o=t[u];t[u]=t[n],t[n]=o}return t.length=r,t}var ce,se,le=(se=(ce=ci(function(t){var i=[];return 46===t.charCodeAt(0)&&i.push(""),t.replace(Go,function(t,r,n,e){i.push(n?e.replace(of,"$1"):r||t)}),i},function(t){return 500===se.size&&se.clear(),t})).cache,ce);function he(t){if("string"==typeof t||Ti(t))return t;var r=t+"";return"0"==r&&1/t==-1/0?"-0":r}function pe(t){if(null!=t){try{return c.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function ve(t){if(t instanceof _t)return t.clone();var r=new gt(t.__wrapped__,t.__chain__);return r.__actions__=en(t.__actions__),r.__index__=t.__index__,r.__values__=t.__values__,r}var de=Ar(function(t,r){return Ei(t)?Mt(t,Vt(r,1,Ei,!0)):[]}),ye=Ar(function(t,r){var n=ke(r);return Ei(n)&&(n=to),Ei(t)?Mt(t,Vt(r,1,Ei,!0),Tn(n,2)):[]}),ge=Ar(function(t,r){var n=ke(r);return Ei(n)&&(n=to),Ei(t)?Mt(t,Vt(r,1,Ei,!0),to,n):[]});function _e(t,r,n){var e=null==t?0:t.length;if(!e)return-1;var i=null==n?0:$i(n);return i<0&&(i=Y(e+i,0)),Gf(t,Tn(r,3),i)}function be(t,r,n){var e=null==t?0:t.length;if(!e)return-1;var i=e-1;return n!==to&&(i=$i(n),i=n<0?Y(e+i,0):Z(i,e-1)),Gf(t,Tn(r,3),i,!0)}function we(t){return null!=t&&t.length?Vt(t,1):[]}function me(t){return t&&t.length?t[0]:to}var Ee=Ar(function(t){var r=$f(t,Vr);return r.length&&r[0]===t[0]?er(r):[]}),xe=Ar(function(t){var r=ke(t),n=$f(t,Vr);return r===ke(n)?r=to:n.pop(),n.length&&n[0]===t[0]?er(n,Tn(r,2)):[]}),Ae=Ar(function(t){var r=ke(t),n=$f(t,Vr);return(r="function"==typeof r?r:to)&&n.pop(),n.length&&n[0]===t[0]?er(n,to,r):[]});function ke(t){var r=null==t?0:t.length;return r?t[r-1]:to}var Be=Ar(Ue);function Ue(t,r){return t&&t.length&&r&&r.length?wr(t,r):t}var Ie=On(function(t,r){var n=null==t?0:t.length,e=Ct(t,r);return mr(t,$f(r,function(t){return Zn(t,n)?+t:t}).sort(tn)),e});function je(t){return null==t?t:H.call(t)}var Se=Ar(function(t){return zr(Vt(t,1,Ei,!0))}),Oe=Ar(function(t){var r=ke(t);return Ei(r)&&(r=to),zr(Vt(t,1,Ei,!0),Tn(r,2))}),De=Ar(function(t){var r=ke(t);return r="function"==typeof r?r:to,zr(Vt(t,1,Ei,!0),to,r)});function Re(r){if(!r||!r.length)return[];var n=0;return r=Nf(r,function(t){if(Ei(t))return n=Y(t.length,n),!0}),ea(n,function(t){return $f(r,ta(t))})}function Ce(t,r){if(!t||!t.length)return[];var n=Re(t);return null==r?n:$f(n,function(t){return Pf(r,to,t)})}var Pe=Ar(function(t,r){return Ei(t)?Mt(t,r):[]}),Le=Ar(function(t){return $r(Nf(t,Ei))}),Te=Ar(function(t){var r=ke(t);return Ei(r)&&(r=to),$r(Nf(t,Ei),Tn(r,2))}),ze=Ar(function(t){var r=ke(t);return r="function"==typeof r?r:to,$r(Nf(t,Ei),to,r)}),Me=Ar(Re);var Ne=Ar(function(t){var r=t.length,n=1<r?t[r-1]:to;return Ce(t,n="function"==typeof n?(t.pop(),n):to)});function We(t){var r=vt(t);return r.__chain__=!0,r}function Fe(t,r){return r(t)}var $e=On(function(r){var n=r.length,t=n?r[0]:0,e=this.__wrapped__,i=function(t){return Ct(t,r)};return!(1<n||this.__actions__.length)&&e instanceof _t&&Zn(t)?((e=e.slice(t,+t+(n?1:0))).__actions__.push({func:Fe,args:[i],thisArg:to}),new gt(e,this.__chain__).thru(function(t){return n&&!t.length&&t.push(to),t})):this.thru(i)});var qe=on(function(t,r,n){k.call(t,n)?++t[n]:Rt(t,n,1)});var Ve=pn(_e),Ye=pn(be);function Ze(t,r){return(bi(t)?Tf:Nt)(t,Tn(r,3))}function Ke(t,r){return(bi(t)?zf:Wt)(t,Tn(r,3))}var Ge=on(function(t,r,n){k.call(t,n)?t[n].push(r):Rt(t,n,[r])});var Je=Ar(function(t,r,n){var e=-1,i="function"==typeof r,u=mi(t)?I(t.length):[];return Nt(t,function(t){u[++e]=i?Pf(r,t,n):ir(t,r,n)}),u}),He=on(function(t,r,n){Rt(t,n,r)});function Xe(t,r){return(bi(t)?$f:pr)(t,Tn(r,3))}var Qe=on(function(t,r,n){t[n?0:1].push(r)},function(){return[[],[]]});var ti=Ar(function(t,r){if(null==t)return[];var n=r.length;return 1<n&&Kn(t,r[0],r[1])?r=[]:2<n&&Kn(r[0],r[1],r[2])&&(r=[r[0]]),_r(t,Vt(r,1),[])}),ri=T||function(){return Uf.Date.now()};function ni(t,r,n){return r=n?to:r,r=t&&null==r?t.length:r,Bn(t,io,to,to,to,to,r)}function ei(t,r){var n;if("function"!=typeof r)throw new j(ro);return t=$i(t),function(){return 0<--t&&(n=r.apply(this,arguments)),t<=1&&(r=to),n}}var ii=Ar(function(t,r,n){var e=1;if(n.length){var i=da(n,Ln(ii));e|=32}return Bn(t,e,r,n,i)}),ui=Ar(function(t,r,n){var e=3;if(n.length){var i=da(n,Ln(ui));e|=32}return Bn(r,e,t,n,i)});function oi(e,i,t){var u,o,f,a,c,s,l=0,h=!1,p=!1,r=!0;if("function"!=typeof e)throw new j(ro);function v(t){var r=u,n=o;return u=o=to,l=t,a=e.apply(n,r)}function d(t){var r=t-s;return s===to||i<=r||r<0||p&&f<=t-l}function y(){var t,r,n=ri();if(d(n))return g(n);c=ie(y,(r=i-((t=n)-s),p?Z(r,f-(t-l)):r))}function g(t){return c=to,r&&u?v(t):(u=o=to,a)}function n(){var t,r=ri(),n=d(r);if(u=arguments,o=this,s=r,n){if(c===to)return l=t=s,c=ie(y,i),h?v(t):a;if(p)return c=ie(y,i),v(s)}return c===to&&(c=ie(y,i)),a}return i=Vi(i)||0,ji(t)&&(h=!!t.leading,f=(p="maxWait"in t)?Y(Vi(t.maxWait)||0,i):f,r="trailing"in t?!!t.trailing:r),n.cancel=function(){c!==to&&Jr(c),l=0,u=s=o=c=to},n.flush=function(){return c===to?a:g(ri())},n}var fi=Ar(function(t,r){return zt(t,1,r)}),ai=Ar(function(t,r,n){return zt(t,Vi(r)||0,n)});function ci(i,u){if("function"!=typeof i||null!=u&&"function"!=typeof u)throw new j(ro);var o=function(){var t=arguments,r=u?u.apply(this,t):t[0],n=o.cache;if(n.has(r))return n.get(r);var e=i.apply(this,t);return o.cache=n.set(r,e)||n,e};return o.cache=new(ci.Cache||mt),o}function si(r){if("function"!=typeof r)throw new j(ro);return function(){var t=arguments;switch(t.length){case 0:return!r.call(this);case 1:return!r.call(this,t[0]);case 2:return!r.call(this,t[0],t[1]);case 3:return!r.call(this,t[0],t[1],t[2])}return!r.apply(this,t)}}ci.Cache=mt;var li=Kr(function(e,i){var u=(i=1==i.length&&bi(i[0])?$f(i[0],ia(Tn())):$f(Vt(i,1),ia(Tn()))).length;return Ar(function(t){for(var r=-1,n=Z(t.length,u);++r<n;)t[r]=i[r].call(this,t[r]);return Pf(e,this,t)})}),hi=Ar(function(t,r){var n=da(r,Ln(hi));return Bn(t,32,to,r,n)}),pi=Ar(function(t,r){var n=da(r,Ln(pi));return Bn(t,64,to,r,n)}),vi=On(function(t,r){return Bn(t,256,to,to,to,r)});function di(t,r){return t===r||t!=t&&r!=r}var yi=mn(tr),gi=mn(function(t,r){return r<=t}),_i=ur(function(){return arguments}())?ur:function(t){return Si(t)&&k.call(t,"callee")&&!S.call(t,"callee")},bi=I.isArray,wi=jf?ia(jf):function(t){return Si(t)&&Qt(t)==Bo};function mi(t){return null!=t&&Ii(t.length)&&!Bi(t)}function Ei(t){return Si(t)&&mi(t)}var xi=F||Vu,Ai=Sf?ia(Sf):function(t){return Si(t)&&Qt(t)==ho};function ki(t){if(!Si(t))return!1;var r=Qt(t);return r==po||"[object DOMException]"==r||"string"==typeof t.message&&"string"==typeof t.name&&!Ri(t)}function Bi(t){if(!ji(t))return!1;var r=Qt(t);return r==vo||r==yo||"[object AsyncFunction]"==r||"[object Proxy]"==r}function Ui(t){return"number"==typeof t&&t==$i(t)}function Ii(t){return"number"==typeof t&&-1<t&&t%1==0&&t<=uo}function ji(t){var r=typeof t;return null!=t&&("object"==r||"function"==r)}function Si(t){return null!=t&&"object"==typeof t}var Oi=Of?ia(Of):function(t){return Si(t)&&$n(t)==go};function Di(t){return"number"==typeof t||Si(t)&&Qt(t)==_o}function Ri(t){if(!Si(t)||Qt(t)!=bo)return!1;var r=B(t);if(null===r)return!0;var n=k.call(r,"constructor")&&r.constructor;return"function"==typeof n&&n instanceof n&&c.call(n)==d}var Ci=Df?ia(Df):function(t){return Si(t)&&Qt(t)==mo};var Pi=Rf?ia(Rf):function(t){return Si(t)&&$n(t)==Eo};function Li(t){return"string"==typeof t||!bi(t)&&Si(t)&&Qt(t)==xo}function Ti(t){return"symbol"==typeof t||Si(t)&&Qt(t)==Ao}var zi=Cf?ia(Cf):function(t){return Si(t)&&Ii(t.length)&&!!xf[Qt(t)]};var Mi=mn(hr),Ni=mn(function(t,r){return t<=r});function Wi(t){if(!t)return[];if(mi(t))return Li(t)?ba(t):en(t);if(R&&t[R])return function(t){for(var r,n=[];!(r=t.next()).done;)n.push(r.value);return n}(t[R]());var r=$n(t);return(r==go?pa:r==Eo?ga:du)(t)}function Fi(t){return t?(t=Vi(t))===1/0||t===-1/0?17976931348623157e292*(t<0?-1:1):t==t?t:0:0===t?t:0}function $i(t){var r=Fi(t),n=r%1;return r==r?n?r-n:r:0}function qi(t){return t?Pt($i(t),0,fo):0}function Vi(t){if("number"==typeof t)return t;if(Ti(t))return oo;if(ji(t)){var r="function"==typeof t.valueOf?t.valueOf():t;t=ji(r)?r+"":r}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(Xo,"");var n=sf.test(t);return n||hf.test(t)?Bf(t.slice(2),n?2:8):cf.test(t)?oo:+t}function Yi(t){return un(t,fu(t))}function Zi(t){return null==t?"":Tr(t)}var Ki=fn(function(t,r){if(Xn(r)||mi(r))un(r,ou(r),t);else for(var n in r)k.call(r,n)&&jt(t,n,r[n])}),Gi=fn(function(t,r){un(r,fu(r),t)}),Ji=fn(function(t,r,n,e){un(r,fu(r),t,e)}),Hi=fn(function(t,r,n,e){un(r,ou(r),t,e)}),Xi=On(Ct);var Qi=Ar(function(t,r){t=A(t);var n=-1,e=r.length,i=2<e?r[2]:to;for(i&&Kn(r[0],r[1],i)&&(e=1);++n<e;)for(var u=r[n],o=fu(u),f=-1,a=o.length;++f<a;){var c=o[f],s=t[c];(s===to||di(s,l[c])&&!k.call(t,c))&&(t[c]=u[c])}return t}),tu=Ar(function(t){return t.push(to,In),Pf(cu,to,t)});function ru(t,r,n){var e=null==t?to:Ht(t,r);return e===to?n:e}function nu(t,r){return null!=t&&qn(t,r,nr)}var eu=yn(function(t,r,n){null!=r&&"function"!=typeof r.toString&&(r=v.call(r)),t[r]=n},ju(Du)),iu=yn(function(t,r,n){null!=r&&"function"!=typeof r.toString&&(r=v.call(r)),k.call(t,r)?t[r].push(n):t[r]=[n]},Tn),uu=Ar(ir);function ou(t){return mi(t)?At(t):sr(t)}function fu(t){return mi(t)?At(t,!0):lr(t)}var au=fn(function(t,r,n){yr(t,r,n)}),cu=fn(function(t,r,n,e){yr(t,r,n,e)}),su=On(function(r,t){var n={};if(null==r)return n;var e=!1;t=$f(t,function(t){return t=Zr(t,r),e||(e=1<t.length),t}),un(r,Rn(r),n),e&&(n=Lt(n,7,jn));for(var i=t.length;i--;)Mr(n,t[i]);return n});var lu=On(function(t,r){return null==t?{}:br(n=t,r,function(t,r){return nu(n,r)});var n});function hu(t,n){if(null==t)return{};var r=$f(Rn(t),function(t){return[t]});return n=Tn(n),br(t,r,function(t,r){return n(t,r[0])})}var pu=kn(ou),vu=kn(fu);function du(t){return null==t?[]:ua(t,ou(t))}var yu=ln(function(t,r,n){return r=r.toLowerCase(),t+(n?gu(r):r)});function gu(t){return ku(Zi(t).toLowerCase())}function _u(t){return(t=Zi(t))&&t.replace(vf,ca).replace(_f,"")}var bu=ln(function(t,r,n){return t+(n?"-":"")+r.toLowerCase()}),wu=ln(function(t,r,n){return t+(n?" ":"")+r.toLowerCase()}),mu=sn("toLowerCase");var Eu=ln(function(t,r,n){return t+(n?"_":"")+r.toLowerCase()});var xu=ln(function(t,r,n){return t+(n?" ":"")+ku(r)});var Au=ln(function(t,r,n){return t+(n?" ":"")+r.toUpperCase()}),ku=sn("toUpperCase");function Bu(t,r,n){return t=Zi(t),(r=n?to:r)===to?(e=t,wf.test(e)?t.match(bf)||[]:t.match(uf)||[]):t.match(r)||[];var e}var Uu=Ar(function(t,r){try{return Pf(t,to,r)}catch(t){return ki(t)?t:new i(t)}}),Iu=On(function(r,t){return Tf(t,function(t){t=he(t),Rt(r,t,ii(r[t],r))}),r});function ju(t){return function(){return t}}var Su=vn(),Ou=vn(!0);function Du(t){return t}function Ru(t){return cr("function"==typeof t?t:Lt(t,1))}var Cu=Ar(function(r,n){return function(t){return ir(t,r,n)}}),Pu=Ar(function(r,n){return function(t){return ir(r,t,n)}});function Lu(e,r,t){var n=ou(r),i=Jt(r,n);null!=t||ji(r)&&(i.length||!n.length)||(t=r,r=e,e=this,i=Jt(r,ou(r)));var u=!(ji(t)&&"chain"in t&&!t.chain),o=Bi(e);return Tf(i,function(t){var n=r[t];e[t]=n,o&&(e.prototype[t]=function(){var t=this.__chain__;if(u||t){var r=e(this.__wrapped__);return(r.__actions__=en(this.__actions__)).push({func:n,args:arguments,thisArg:e}),r.__chain__=t,r}return n.apply(e,qf([this.value()],arguments))})}),e}function Tu(){}var zu=_n($f),Mu=_n(Mf),Nu=_n(Zf);function Wu(t){return Gn(t)?ta(he(t)):(r=t,function(t){return Ht(t,r)});var r}var Fu=wn(),$u=wn(!0);function qu(){return[]}function Vu(){return!1}var Yu=gn(function(t,r){return t+r},0),Zu=xn("ceil"),Ku=gn(function(t,r){return t/r},1),Gu=xn("floor");var Ju,Hu=gn(function(t,r){return t*r},1),Xu=xn("round"),Qu=gn(function(t,r){return t-r},0);return vt.after=function(t,r){if("function"!=typeof r)throw new j(ro);return t=$i(t),function(){if(--t<1)return r.apply(this,arguments)}},vt.ary=ni,vt.assign=Ki,vt.assignIn=Gi,vt.assignInWith=Ji,vt.assignWith=Hi,vt.at=Xi,vt.before=ei,vt.bind=ii,vt.bindAll=Iu,vt.bindKey=ui,vt.castArray=function(){if(!arguments.length)return[];var t=arguments[0];return bi(t)?t:[t]},vt.chain=We,vt.chunk=function(t,r,n){r=(n?Kn(t,r,n):r===to)?1:Y($i(r),0);var e=null==t?0:t.length;if(!e||r<1)return[];for(var i=0,u=0,o=I(M(e/r));i<e;)o[u++]=Or(t,i,i+=r);return o},vt.compact=function(t){for(var r=-1,n=null==t?0:t.length,e=0,i=[];++r<n;){var u=t[r];u&&(i[e++]=u)}return i},vt.concat=function(){var t=arguments.length;if(!t)return[];for(var r=I(t-1),n=arguments[0],e=t;e--;)r[e-1]=arguments[e];return qf(bi(n)?en(n):[n],Vt(r,1))},vt.cond=function(e){var i=null==e?0:e.length,r=Tn();return e=i?$f(e,function(t){if("function"!=typeof t[1])throw new j(ro);return[r(t[0]),t[1]]}):[],Ar(function(t){for(var r=-1;++r<i;){var n=e[r];if(Pf(n[0],this,t))return Pf(n[1],this,t)}})},vt.conforms=function(t){return r=Lt(t,1),n=ou(r),function(t){return Tt(t,r,n)};var r,n},vt.constant=ju,vt.countBy=qe,vt.create=function(t,r){var n=dt(t);return null==r?n:Dt(n,r)},vt.curry=function t(r,n,e){var i=Bn(r,8,to,to,to,to,to,n=e?to:n);return i.placeholder=t.placeholder,i},vt.curryRight=function t(r,n,e){var i=Bn(r,16,to,to,to,to,to,n=e?to:n);return i.placeholder=t.placeholder,i},vt.debounce=oi,vt.defaults=Qi,vt.defaultsDeep=tu,vt.defer=fi,vt.delay=ai,vt.difference=de,vt.differenceBy=ye,vt.differenceWith=ge,vt.drop=function(t,r,n){var e=null==t?0:t.length;return e?Or(t,(r=n||r===to?1:$i(r))<0?0:r,e):[]},vt.dropRight=function(t,r,n){var e=null==t?0:t.length;return e?Or(t,0,(r=e-(r=n||r===to?1:$i(r)))<0?0:r):[]},vt.dropRightWhile=function(t,r){return t&&t.length?Wr(t,Tn(r,3),!0,!0):[]},vt.dropWhile=function(t,r){return t&&t.length?Wr(t,Tn(r,3),!0):[]},vt.fill=function(t,r,n,e){var i=null==t?0:t.length;return i?(n&&"number"!=typeof n&&Kn(t,r,n)&&(n=0,e=i),function(t,r,n,e){var i=t.length;for((n=$i(n))<0&&(n=i<-n?0:i+n),(e=e===to||i<e?i:$i(e))<0&&(e+=i),e=e<n?0:qi(e);n<e;)t[n++]=r;return t}(t,r,n,e)):[]},vt.filter=function(t,r){return(bi(t)?Nf:qt)(t,Tn(r,3))},vt.flatMap=function(t,r){return Vt(Xe(t,r),1)},vt.flatMapDeep=function(t,r){return Vt(Xe(t,r),1/0)},vt.flatMapDepth=function(t,r,n){return n=n===to?1:$i(n),Vt(Xe(t,r),n)},vt.flatten=we,vt.flattenDeep=function(t){return null!=t&&t.length?Vt(t,1/0):[]},vt.flattenDepth=function(t,r){return null!=t&&t.length?Vt(t,r=r===to?1:$i(r)):[]},vt.flip=function(t){return Bn(t,512)},vt.flow=Su,vt.flowRight=Ou,vt.fromPairs=function(t){for(var r=-1,n=null==t?0:t.length,e={};++r<n;){var i=t[r];e[i[0]]=i[1]}return e},vt.functions=function(t){return null==t?[]:Jt(t,ou(t))},vt.functionsIn=function(t){return null==t?[]:Jt(t,fu(t))},vt.groupBy=Ge,vt.initial=function(t){return null!=t&&t.length?Or(t,0,-1):[]},vt.intersection=Ee,vt.intersectionBy=xe,vt.intersectionWith=Ae,vt.invert=eu,vt.invertBy=iu,vt.invokeMap=Je,vt.iteratee=Ru,vt.keyBy=He,vt.keys=ou,vt.keysIn=fu,vt.map=Xe,vt.mapKeys=function(t,e){var i={};return e=Tn(e,3),Kt(t,function(t,r,n){Rt(i,e(t,r,n),t)}),i},vt.mapValues=function(t,e){var i={};return e=Tn(e,3),Kt(t,function(t,r,n){Rt(i,r,e(t,r,n))}),i},vt.matches=function(t){return vr(Lt(t,1))},vt.matchesProperty=function(t,r){return dr(t,Lt(r,1))},vt.memoize=ci,vt.merge=au,vt.mergeWith=cu,vt.method=Cu,vt.methodOf=Pu,vt.mixin=Lu,vt.negate=si,vt.nthArg=function(r){return r=$i(r),Ar(function(t){return gr(t,r)})},vt.omit=su,vt.omitBy=function(t,r){return hu(t,si(Tn(r)))},vt.once=function(t){return ei(2,t)},vt.orderBy=function(t,r,n,e){return null==t?[]:(bi(r)||(r=null==r?[]:[r]),bi(n=e?to:n)||(n=null==n?[]:[n]),_r(t,r,n))},vt.over=zu,vt.overArgs=li,vt.overEvery=Mu,vt.overSome=Nu,vt.partial=hi,vt.partialRight=pi,vt.partition=Qe,vt.pick=lu,vt.pickBy=hu,vt.property=Wu,vt.propertyOf=function(r){return function(t){return null==r?to:Ht(r,t)}},vt.pull=Be,vt.pullAll=Ue,vt.pullAllBy=function(t,r,n){return t&&t.length&&r&&r.length?wr(t,r,Tn(n,2)):t},vt.pullAllWith=function(t,r,n){return t&&t.length&&r&&r.length?wr(t,r,to,n):t},vt.pullAt=Ie,vt.range=Fu,vt.rangeRight=$u,vt.rearg=vi,vt.reject=function(t,r){return(bi(t)?Nf:qt)(t,si(Tn(r,3)))},vt.remove=function(t,r){var n=[];if(!t||!t.length)return n;var e=-1,i=[],u=t.length;for(r=Tn(r,3);++e<u;){var o=t[e];r(o,e,t)&&(n.push(o),i.push(e))}return mr(t,i),n},vt.rest=function(t,r){if("function"!=typeof t)throw new j(ro);return Ar(t,r=r===to?r:$i(r))},vt.reverse=je,vt.sampleSize=function(t,r,n){return r=(n?Kn(t,r,n):r===to)?1:$i(r),(bi(t)?Bt:Br)(t,r)},vt.set=function(t,r,n){return null==t?t:Ur(t,r,n)},vt.setWith=function(t,r,n,e){return e="function"==typeof e?e:to,null==t?t:Ur(t,r,n,e)},vt.shuffle=function(t){return(bi(t)?Ut:Sr)(t)},vt.slice=function(t,r,n){var e=null==t?0:t.length;return e?(n&&"number"!=typeof n&&Kn(t,r,n)?(r=0,n=e):(r=null==r?0:$i(r),n=n===to?e:$i(n)),Or(t,r,n)):[]},vt.sortBy=ti,vt.sortedUniq=function(t){return t&&t.length?Pr(t):[]},vt.sortedUniqBy=function(t,r){return t&&t.length?Pr(t,Tn(r,2)):[]},vt.split=function(t,r,n){return n&&"number"!=typeof n&&Kn(t,r,n)&&(r=n=to),(n=n===to?fo:n>>>0)?(t=Zi(t))&&("string"==typeof r||null!=r&&!Ci(r))&&!(r=Tr(r))&&ha(t)?Gr(ba(t),0,n):t.split(r,n):[]},vt.spread=function(e,i){if("function"!=typeof e)throw new j(ro);return i=null==i?0:Y($i(i),0),Ar(function(t){var r=t[i],n=Gr(t,0,i);return r&&qf(n,r),Pf(e,this,n)})},vt.tail=function(t){var r=null==t?0:t.length;return r?Or(t,1,r):[]},vt.take=function(t,r,n){return t&&t.length?Or(t,0,(r=n||r===to?1:$i(r))<0?0:r):[]},vt.takeRight=function(t,r,n){var e=null==t?0:t.length;return e?Or(t,(r=e-(r=n||r===to?1:$i(r)))<0?0:r,e):[]},vt.takeRightWhile=function(t,r){return t&&t.length?Wr(t,Tn(r,3),!1,!0):[]},vt.takeWhile=function(t,r){return t&&t.length?Wr(t,Tn(r,3)):[]},vt.tap=function(t,r){return r(t),t},vt.throttle=function(t,r,n){var e=!0,i=!0;if("function"!=typeof t)throw new j(ro);return ji(n)&&(e="leading"in n?!!n.leading:e,i="trailing"in n?!!n.trailing:i),oi(t,r,{leading:e,maxWait:r,trailing:i})},vt.thru=Fe,vt.toArray=Wi,vt.toPairs=pu,vt.toPairsIn=vu,vt.toPath=function(t){return bi(t)?$f(t,he):Ti(t)?[t]:en(le(Zi(t)))},vt.toPlainObject=Yi,vt.transform=function(t,e,i){var r=bi(t),n=r||xi(t)||zi(t);if(e=Tn(e,4),null==i){var u=t&&t.constructor;i=n?r?new u:[]:ji(t)&&Bi(u)?dt(B(t)):{}}return(n?Tf:Kt)(t,function(t,r,n){return e(i,t,r,n)}),i},vt.unary=function(t){return ni(t,1)},vt.union=Se,vt.unionBy=Oe,vt.unionWith=De,vt.uniq=function(t){return t&&t.length?zr(t):[]},vt.uniqBy=function(t,r){return t&&t.length?zr(t,Tn(r,2)):[]},vt.uniqWith=function(t,r){return r="function"==typeof r?r:to,t&&t.length?zr(t,to,r):[]},vt.unset=function(t,r){return null==t||Mr(t,r)},vt.unzip=Re,vt.unzipWith=Ce,vt.update=function(t,r,n){return null==t?t:Nr(t,r,Yr(n))},vt.updateWith=function(t,r,n,e){return e="function"==typeof e?e:to,null==t?t:Nr(t,r,Yr(n),e)},vt.values=du,vt.valuesIn=function(t){return null==t?[]:ua(t,fu(t))},vt.without=Pe,vt.words=Bu,vt.wrap=function(t,r){return hi(Yr(r),t)},vt.xor=Le,vt.xorBy=Te,vt.xorWith=ze,vt.zip=Me,vt.zipObject=function(t,r){return qr(t||[],r||[],jt)},vt.zipObjectDeep=function(t,r){return qr(t||[],r||[],Ur)},vt.zipWith=Ne,vt.entries=pu,vt.entriesIn=vu,vt.extend=Gi,vt.extendWith=Ji,Lu(vt,vt),vt.add=Yu,vt.attempt=Uu,vt.camelCase=yu,vt.capitalize=gu,vt.ceil=Zu,vt.clamp=function(t,r,n){return n===to&&(n=r,r=to),n!==to&&(n=(n=Vi(n))==n?n:0),r!==to&&(r=(r=Vi(r))==r?r:0),Pt(Vi(t),r,n)},vt.clone=function(t){return Lt(t,4)},vt.cloneDeep=function(t){return Lt(t,5)},vt.cloneDeepWith=function(t,r){return Lt(t,5,r="function"==typeof r?r:to)},vt.cloneWith=function(t,r){return Lt(t,4,r="function"==typeof r?r:to)},vt.conformsTo=function(t,r){return null==r||Tt(t,r,ou(r))},vt.deburr=_u,vt.defaultTo=function(t,r){return null==t||t!=t?r:t},vt.divide=Ku,vt.endsWith=function(t,r,n){t=Zi(t),r=Tr(r);var e=t.length,i=n=n===to?e:Pt($i(n),0,e);return 0<=(n-=r.length)&&t.slice(n,i)==r},vt.eq=di,vt.escape=function(t){return(t=Zi(t))&&$o.test(t)?t.replace(Wo,sa):t},vt.escapeRegExp=function(t){return(t=Zi(t))&&Ho.test(t)?t.replace(Jo,"\\$&"):t},vt.every=function(t,r,n){var e=bi(t)?Mf:Ft;return n&&Kn(t,r,n)&&(r=to),e(t,Tn(r,3))},vt.find=Ve,vt.findIndex=_e,vt.findKey=function(t,r){return Kf(t,Tn(r,3),Kt)},vt.findLast=Ye,vt.findLastIndex=be,vt.findLastKey=function(t,r){return Kf(t,Tn(r,3),Gt)},vt.floor=Gu,vt.forEach=Ze,vt.forEachRight=Ke,vt.forIn=function(t,r){return null==t?t:Yt(t,Tn(r,3),fu)},vt.forInRight=function(t,r){return null==t?t:Zt(t,Tn(r,3),fu)},vt.forOwn=function(t,r){return t&&Kt(t,Tn(r,3))},vt.forOwnRight=function(t,r){return t&&Gt(t,Tn(r,3))},vt.get=ru,vt.gt=yi,vt.gte=gi,vt.has=function(t,r){return null!=t&&qn(t,r,rr)},vt.hasIn=nu,vt.head=me,vt.identity=Du,vt.includes=function(t,r,n,e){t=mi(t)?t:du(t),n=n&&!e?$i(n):0;var i=t.length;return n<0&&(n=Y(i+n,0)),Li(t)?n<=i&&-1<t.indexOf(r,n):!!i&&-1<Jf(t,r,n)},vt.indexOf=function(t,r,n){var e=null==t?0:t.length;if(!e)return-1;var i=null==n?0:$i(n);return i<0&&(i=Y(e+i,0)),Jf(t,r,i)},vt.inRange=function(t,r,n){return r=Fi(r),n===to?(n=r,r=0):n=Fi(n),t=Vi(t),(e=t)>=Z(i=r,u=n)&&e<Y(i,u);var e,i,u},vt.invoke=uu,vt.isArguments=_i,vt.isArray=bi,vt.isArrayBuffer=wi,vt.isArrayLike=mi,vt.isArrayLikeObject=Ei,vt.isBoolean=function(t){return!0===t||!1===t||Si(t)&&Qt(t)==lo},vt.isBuffer=xi,vt.isDate=Ai,vt.isElement=function(t){return Si(t)&&1===t.nodeType&&!Ri(t)},vt.isEmpty=function(t){if(null==t)return!0;if(mi(t)&&(bi(t)||"string"==typeof t||"function"==typeof t.splice||xi(t)||zi(t)||_i(t)))return!t.length;var r=$n(t);if(r==go||r==Eo)return!t.size;if(Xn(t))return!sr(t).length;for(var n in t)if(k.call(t,n))return!1;return!0},vt.isEqual=function(t,r){return or(t,r)},vt.isEqualWith=function(t,r,n){var e=(n="function"==typeof n?n:to)?n(t,r):to;return e===to?or(t,r,to,n):!!e},vt.isError=ki,vt.isFinite=function(t){return"number"==typeof t&&$(t)},vt.isFunction=Bi,vt.isInteger=Ui,vt.isLength=Ii,vt.isMap=Oi,vt.isMatch=function(t,r){return t===r||fr(t,r,Mn(r))},vt.isMatchWith=function(t,r,n){return n="function"==typeof n?n:to,fr(t,r,Mn(r),n)},vt.isNaN=function(t){return Di(t)&&t!=+t},vt.isNative=function(t){if(Hn(t))throw new i("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.");return ar(t)},vt.isNil=function(t){return null==t},vt.isNull=function(t){return null===t},vt.isNumber=Di,vt.isObject=ji,vt.isObjectLike=Si,vt.isPlainObject=Ri,vt.isRegExp=Ci,vt.isSafeInteger=function(t){return Ui(t)&&-uo<=t&&t<=uo},vt.isSet=Pi,vt.isString=Li,vt.isSymbol=Ti,vt.isTypedArray=zi,vt.isUndefined=function(t){return t===to},vt.isWeakMap=function(t){return Si(t)&&$n(t)==ko},vt.isWeakSet=function(t){return Si(t)&&"[object WeakSet]"==Qt(t)},vt.join=function(t,r){return null==t?"":q.call(t,r)},vt.kebabCase=bu,vt.last=ke,vt.lastIndexOf=function(t,r,n){var e=null==t?0:t.length;if(!e)return-1;var i=e;return n!==to&&(i=(i=$i(n))<0?Y(e+i,0):Z(i,e-1)),r==r?function(t,r,n){for(var e=n+1;e--;)if(t[e]===r)return e;return e}(t,r,i):Gf(t,Xf,i,!0)},vt.lowerCase=wu,vt.lowerFirst=mu,vt.lt=Mi,vt.lte=Ni,vt.max=function(t){return t&&t.length?$t(t,Du,tr):to},vt.maxBy=function(t,r){return t&&t.length?$t(t,Tn(r,2),tr):to},vt.mean=function(t){return Qf(t,Du)},vt.meanBy=function(t,r){return Qf(t,Tn(r,2))},vt.min=function(t){return t&&t.length?$t(t,Du,hr):to},vt.minBy=function(t,r){return t&&t.length?$t(t,Tn(r,2),hr):to},vt.stubArray=qu,vt.stubFalse=Vu,vt.stubObject=function(){return{}},vt.stubString=function(){return""},vt.stubTrue=function(){return!0},vt.multiply=Hu,vt.nth=function(t,r){return t&&t.length?gr(t,$i(r)):to},vt.noConflict=function(){return Uf._===this&&(Uf._=_),this},vt.noop=Tu,vt.now=ri,vt.pad=function(t,r,n){t=Zi(t);var e=(r=$i(r))?_a(t):0;if(!r||r<=e)return t;var i=(r-e)/2;return bn(N(i),n)+t+bn(M(i),n)},vt.padEnd=function(t,r,n){t=Zi(t);var e=(r=$i(r))?_a(t):0;return r&&e<r?t+bn(r-e,n):t},vt.padStart=function(t,r,n){t=Zi(t);var e=(r=$i(r))?_a(t):0;return r&&e<r?bn(r-e,n)+t:t},vt.parseInt=function(t,r,n){return n||null==r?r=0:r&&(r=+r),G(Zi(t).replace(Qo,""),r||0)},vt.random=function(t,r,n){if(n&&"boolean"!=typeof n&&Kn(t,r,n)&&(r=n=to),n===to&&("boolean"==typeof r?(n=r,r=to):"boolean"==typeof t&&(n=t,t=to)),t===to&&r===to?(t=0,r=1):(t=Fi(t),r===to?(r=t,t=0):r=Fi(r)),r<t){var e=t;t=r,r=e}if(n||t%1||r%1){var i=J();return Z(t+i*(r-t+kf("1e-"+((i+"").length-1))),r)}return Er(t,r)},vt.reduce=function(t,r,n){var e=bi(t)?Vf:ra,i=arguments.length<3;return e(t,Tn(r,4),n,i,Nt)},vt.reduceRight=function(t,r,n){var e=bi(t)?Yf:ra,i=arguments.length<3;return e(t,Tn(r,4),n,i,Wt)},vt.repeat=function(t,r,n){return r=(n?Kn(t,r,n):r===to)?1:$i(r),xr(Zi(t),r)},vt.replace=function(){var t=arguments,r=Zi(t[0]);return t.length<3?r:r.replace(t[1],t[2])},vt.result=function(t,r,n){var e=-1,i=(r=Zr(r,t)).length;for(i||(i=1,t=to);++e<i;){var u=null==t?to:t[he(r[e])];u===to&&(e=i,u=n),t=Bi(u)?u.call(t):u}return t},vt.round=Xu,vt.runInContext=t,vt.sample=function(t){return(bi(t)?kt:kr)(t)},vt.size=function(t){if(null==t)return 0;if(mi(t))return Li(t)?_a(t):t.length;var r=$n(t);return r==go||r==Eo?t.size:sr(t).length},vt.snakeCase=Eu,vt.some=function(t,r,n){var e=bi(t)?Zf:Dr;return n&&Kn(t,r,n)&&(r=to),e(t,Tn(r,3))},vt.sortedIndex=function(t,r){return Rr(t,r)},vt.sortedIndexBy=function(t,r,n){return Cr(t,r,Tn(n,2))},vt.sortedIndexOf=function(t,r){var n=null==t?0:t.length;if(n){var e=Rr(t,r);if(e<n&&di(t[e],r))return e}return-1},vt.sortedLastIndex=function(t,r){return Rr(t,r,!0)},vt.sortedLastIndexBy=function(t,r,n){return Cr(t,r,Tn(n,2),!0)},vt.sortedLastIndexOf=function(t,r){if(null!=t&&t.length){var n=Rr(t,r,!0)-1;if(di(t[n],r))return n}return-1},vt.startCase=xu,vt.startsWith=function(t,r,n){return t=Zi(t),n=null==n?0:Pt($i(n),0,t.length),r=Tr(r),t.slice(n,n+r.length)==r},vt.subtract=Qu,vt.sum=function(t){return t&&t.length?na(t,Du):0},vt.sumBy=function(t,r){return t&&t.length?na(t,Tn(r,2)):0},vt.template=function(o,t,r){var n=vt.templateSettings;r&&Kn(o,t,r)&&(t=to),o=Zi(o),t=Ji({},t,n,Un);var f,a,e=Ji({},t.imports,n.imports,Un),i=ou(e),u=ua(e,i),c=0,s=t.interpolate||df,l="__p += '",h=g((t.escape||df).source+"|"+s.source+"|"+(s===Yo?ff:df).source+"|"+(t.evaluate||df).source+"|$","g"),p="//# sourceURL="+("sourceURL"in t?t.sourceURL:"lodash.templateSources["+ ++Ef+"]")+"\n";o.replace(h,function(t,r,n,e,i,u){return n||(n=e),l+=o.slice(c,u).replace(yf,la),r&&(f=!0,l+="' +\n__e("+r+") +\n'"),i&&(a=!0,l+="';\n"+i+";\n__p += '"),n&&(l+="' +\n((__t = ("+n+")) == null ? '' : __t) +\n'"),c=u+t.length,t}),l+="';\n";var v=t.variable;v||(l="with (obj) {\n"+l+"\n}\n"),l=(a?l.replace(To,""):l).replace(zo,"$1").replace(Mo,"$1;"),l="function("+(v||"obj")+") {\n"+(v?"":"obj || (obj = {});\n")+"var __t, __p = ''"+(f?", __e = _.escape":"")+(a?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+l+"return __p\n}";var d=Uu(function(){return y(i,p+"return "+l).apply(to,u)});if(d.source=l,ki(d))throw d;return d},vt.times=function(t,r){if((t=$i(t))<1||uo<t)return[];var n=fo,e=Z(t,fo);r=Tn(r),t-=fo;for(var i=ea(e,r);++n<t;)r(n);return i},vt.toFinite=Fi,vt.toInteger=$i,vt.toLength=qi,vt.toLower=function(t){return Zi(t).toLowerCase()},vt.toNumber=Vi,vt.toSafeInteger=function(t){return t?Pt($i(t),-uo,uo):0===t?t:0},vt.toString=Zi,vt.toUpper=function(t){return Zi(t).toUpperCase()},vt.trim=function(t,r,n){if((t=Zi(t))&&(n||r===to))return t.replace(Xo,"");if(!t||!(r=Tr(r)))return t;var e=ba(t),i=ba(r);return Gr(e,fa(e,i),aa(e,i)+1).join("")},vt.trimEnd=function(t,r,n){if((t=Zi(t))&&(n||r===to))return t.replace(tf,"");if(!t||!(r=Tr(r)))return t;var e=ba(t);return Gr(e,0,aa(e,ba(r))+1).join("")},vt.trimStart=function(t,r,n){if((t=Zi(t))&&(n||r===to))return t.replace(Qo,"");if(!t||!(r=Tr(r)))return t;var e=ba(t);return Gr(e,fa(e,ba(r))).join("")},vt.truncate=function(t,r){var n=30,e="...";if(ji(r)){var i="separator"in r?r.separator:i;n="length"in r?$i(r.length):n,e="omission"in r?Tr(r.omission):e}var u=(t=Zi(t)).length;if(ha(t)){var o=ba(t);u=o.length}if(u<=n)return t;var f=n-_a(e);if(f<1)return e;var a=o?Gr(o,0,f).join(""):t.slice(0,f);if(i===to)return a+e;if(o&&(f+=a.length-f),Ci(i)){if(t.slice(f).search(i)){var c,s=a;for(i.global||(i=g(i.source,Zi(af.exec(i))+"g")),i.lastIndex=0;c=i.exec(s);)var l=c.index;a=a.slice(0,l===to?f:l)}}else if(t.indexOf(Tr(i),f)!=f){var h=a.lastIndexOf(i);-1<h&&(a=a.slice(0,h))}return a+e},vt.unescape=function(t){return(t=Zi(t))&&Fo.test(t)?t.replace(No,wa):t},vt.uniqueId=function(t){var r=++h;return Zi(t)+r},vt.upperCase=Au,vt.upperFirst=ku,vt.each=Ze,vt.eachRight=Ke,vt.first=me,Lu(vt,(Ju={},Kt(vt,function(t,r){k.call(vt.prototype,r)||(Ju[r]=t)}),Ju),{chain:!1}),vt.VERSION="4.17.10",Tf(["bind","bindKey","curry","curryRight","partial","partialRight"],function(t){vt[t].placeholder=vt}),Tf(["drop","take"],function(n,e){_t.prototype[n]=function(t){t=t===to?1:Y($i(t),0);var r=this.__filtered__&&!e?new _t(this):this.clone();return r.__filtered__?r.__takeCount__=Z(t,r.__takeCount__):r.__views__.push({size:Z(t,fo),type:n+(r.__dir__<0?"Right":"")}),r},_t.prototype[n+"Right"]=function(t){return this.reverse()[n](t).reverse()}}),Tf(["filter","map","takeWhile"],function(t,r){var n=r+1,e=1==n||3==n;_t.prototype[t]=function(t){var r=this.clone();return r.__iteratees__.push({iteratee:Tn(t,3),type:n}),r.__filtered__=r.__filtered__||e,r}}),Tf(["head","last"],function(t,r){var n="take"+(r?"Right":"");_t.prototype[t]=function(){return this[n](1).value()[0]}}),Tf(["initial","tail"],function(t,r){var n="drop"+(r?"":"Right");_t.prototype[t]=function(){return this.__filtered__?new _t(this):this[n](1)}}),_t.prototype.compact=function(){return this.filter(Du)},_t.prototype.find=function(t){return this.filter(t).head()},_t.prototype.findLast=function(t){return this.reverse().find(t)},_t.prototype.invokeMap=Ar(function(r,n){return"function"==typeof r?new _t(this):this.map(function(t){return ir(t,r,n)})}),_t.prototype.reject=function(t){return this.filter(si(Tn(t)))},_t.prototype.slice=function(t,r){t=$i(t);var n=this;return n.__filtered__&&(0<t||r<0)?new _t(n):(t<0?n=n.takeRight(-t):t&&(n=n.drop(t)),r!==to&&(n=(r=$i(r))<0?n.dropRight(-r):n.take(r-t)),n)},_t.prototype.takeRightWhile=function(t){return this.reverse().takeWhile(t).reverse()},_t.prototype.toArray=function(){return this.take(fo)},Kt(_t.prototype,function(l,t){var h=/^(?:filter|find|map|reject)|While$/.test(t),p=/^(?:head|last)$/.test(t),v=vt[p?"take"+("last"==t?"Right":""):t],d=p||/^find/.test(t);v&&(vt.prototype[t]=function(){var t=this.__wrapped__,n=p?[1]:arguments,r=t instanceof _t,e=n[0],i=r||bi(t),u=function(t){var r=v.apply(vt,qf([t],n));return p&&o?r[0]:r};i&&h&&"function"==typeof e&&1!=e.length&&(r=i=!1);var o=this.__chain__,f=!!this.__actions__.length,a=d&&!o,c=r&&!f;if(!d&&i){t=c?t:new _t(this);var s=l.apply(t,n);return s.__actions__.push({func:Fe,args:[u],thisArg:to}),new gt(s,o)}return a&&c?l.apply(this,n):(s=this.thru(u),a?p?s.value()[0]:s.value():s)})}),Tf(["pop","push","shift","sort","splice","unshift"],function(t){var n=o[t],e=/^(?:push|sort|unshift)$/.test(t)?"tap":"thru",i=/^(?:pop|shift)$/.test(t);vt.prototype[t]=function(){var r=arguments;if(i&&!this.__chain__){var t=this.value();return n.apply(bi(t)?t:[],r)}return this[e](function(t){return n.apply(bi(t)?t:[],r)})}}),Kt(_t.prototype,function(t,r){var n=vt[r];if(n){var e=n.name+"";(ut[e]||(ut[e]=[])).push({name:r,func:n})}}),ut[dn(to,2).name]=[{name:"wrapper",func:to}],_t.prototype.clone=function(){var t=new _t(this.__wrapped__);return t.__actions__=en(this.__actions__),t.__dir__=this.__dir__,t.__filtered__=this.__filtered__,t.__iteratees__=en(this.__iteratees__),t.__takeCount__=this.__takeCount__,t.__views__=en(this.__views__),t},_t.prototype.reverse=function(){if(this.__filtered__){var t=new _t(this);t.__dir__=-1,t.__filtered__=!0}else(t=this.clone()).__dir__*=-1;return t},_t.prototype.value=function(){var t=this.__wrapped__.value(),r=this.__dir__,n=bi(t),e=r<0,i=n?t.length:0,u=function(t,r,n){for(var e=-1,i=n.length;++e<i;){var u=n[e],o=u.size;switch(u.type){case"drop":t+=o;break;case"dropRight":r-=o;break;case"take":r=Z(r,t+o);break;case"takeRight":t=Y(t,r-o)}}return{start:t,end:r}}(0,i,this.__views__),o=u.start,f=u.end,a=f-o,c=e?f:o-1,s=this.__iteratees__,l=s.length,h=0,p=Z(a,this.__takeCount__);if(!n||!e&&i==a&&p==a)return Fr(t,this.__actions__);var v=[];t:for(;a--&&h<p;){for(var d=-1,y=t[c+=r];++d<l;){var g=s[d],_=g.iteratee,b=g.type,w=_(y);if(2==b)y=w;else if(!w){if(1==b)continue t;break t}}v[h++]=y}return v},vt.prototype.at=$e,vt.prototype.chain=function(){return We(this)},vt.prototype.commit=function(){return new gt(this.value(),this.__chain__)},vt.prototype.next=function(){this.__values__===to&&(this.__values__=Wi(this.value()));var t=this.__index__>=this.__values__.length;return{done:t,value:t?to:this.__values__[this.__index__++]}},vt.prototype.plant=function(t){for(var r,n=this;n instanceof yt;){var e=ve(n);e.__index__=0,e.__values__=to,r?i.__wrapped__=e:r=e;var i=e;n=n.__wrapped__}return i.__wrapped__=t,r},vt.prototype.reverse=function(){var t=this.__wrapped__;if(t instanceof _t){var r=t;return this.__actions__.length&&(r=new _t(this)),(r=r.reverse()).__actions__.push({func:Fe,args:[je],thisArg:to}),new gt(r,this.__chain__)}return this.thru(je)},vt.prototype.toJSON=vt.prototype.valueOf=vt.prototype.value=function(){return Fr(this.__wrapped__,this.__actions__)},vt.prototype.first=vt.prototype.head,R&&(vt.prototype[R]=function(){return this}),vt}();L?((L.exports=ma)._=ma,P._=ma):Uf._=ma}).call(this)}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],12:[function(t,r,n){n.encode=t("./encode").encode,n.decode=t("./decode").decode,n.Encoder=t("./encoder").Encoder,n.Decoder=t("./decoder").Decoder,n.createCodec=t("./ext").createCodec,n.codec=t("./codec").codec},{"./codec":21,"./decode":23,"./decoder":24,"./encode":26,"./encoder":27,"./ext":31}],13:[function(t,n,r){(function(t){function r(t){return t&&t.isBuffer&&t}n.exports=r(void 0!==t&&t)||r(this.Buffer)||r("undefined"!=typeof window&&window.Buffer)||this.Buffer}).call(this,t("buffer").Buffer)},{buffer:5}],14:[function(t,r,n){n.copy=function(t,r,n,e){var i;n||(n=0);e||0===e||(e=this.length);r||(r=0);var u=e-n;if(t===this&&n<r&&r<e)for(i=u-1;0<=i;i--)t[i+r]=this[i+n];else for(i=0;i<u;i++)t[i+r]=this[i+n];return u},n.toString=function(t,r,n){var e=0|r;n||(n=this.length);var i="",u=0;for(;e<n;)(u=this[e++])<128?i+=String.fromCharCode(u):(192==(224&u)?u=(31&u)<<6|63&this[e++]:224==(240&u)?u=(15&u)<<12|(63&this[e++])<<6|63&this[e++]:240==(248&u)&&(u=(7&u)<<18|(63&this[e++])<<12|(63&this[e++])<<6|63&this[e++]),65536<=u?(u-=65536,i+=String.fromCharCode(55296+(u>>>10),56320+(1023&u))):i+=String.fromCharCode(u));return i},n.write=function(t,r){var n=this,e=r||(r|=0),i=t.length,u=0,o=0;for(;o<i;)(u=t.charCodeAt(o++))<128?n[e++]=u:(u<2048?n[e++]=192|u>>>6:(u<55296||57343<u?n[e++]=224|u>>>12:(u=65536+(u-55296<<10|t.charCodeAt(o++)-56320),n[e++]=240|u>>>18,n[e++]=128|u>>>12&63),n[e++]=128|u>>>6&63),n[e++]=128|63&u);return e-r}},{}],15:[function(t,r,n){var e=t("./bufferish");function i(t){return new Array(t)}(n=r.exports=i(0)).alloc=i,n.concat=e.concat,n.from=function(t){if(!e.isBuffer(t)&&e.isView(t))t=e.Uint8Array.from(t);else if(e.isArrayBuffer(t))t=new Uint8Array(t);else{if("string"==typeof t)return e.from.call(n,t);if("number"==typeof t)throw new TypeError('"value" argument must not be a number')}return Array.prototype.slice.call(t)}},{"./bufferish":19}],16:[function(t,r,n){var e=t("./bufferish"),i=e.global;function u(t){return new i(t)}(n=r.exports=e.hasBuffer?u(0):[]).alloc=e.hasBuffer&&i.alloc||u,n.concat=e.concat,n.from=function(t){if(!e.isBuffer(t)&&e.isView(t))t=e.Uint8Array.from(t);else if(e.isArrayBuffer(t))t=new Uint8Array(t);else{if("string"==typeof t)return e.from.call(n,t);if("number"==typeof t)throw new TypeError('"value" argument must not be a number')}return i.from&&1!==i.from.length?i.from(t):new i(t)}},{"./bufferish":19}],17:[function(t,r,n){var e,f=t("./buffer-lite");n.copy=o,n.slice=s,n.toString=function(t,r,n){return(!u&&a.isBuffer(this)?this.toString:f.toString).apply(this,arguments)},n.write=(e="write",function(){return(this[e]||f[e]).apply(this,arguments)});var a=t("./bufferish"),i=a.global,u=a.hasBuffer&&"TYPED_ARRAY_SUPPORT"in i,c=u&&!i.TYPED_ARRAY_SUPPORT;function o(t,r,n,e){var i=a.isBuffer(this),u=a.isBuffer(t);if(i&&u)return this.copy(t,r,n,e);if(c||i||u||!a.isView(this)||!a.isView(t))return f.copy.call(this,t,r,n,e);var o=n||null!=e?s.call(this,n,e):this;return t.set(o,r),o.length}function s(t,r){var n=this.slice||!c&&this.subarray;if(n)return n.call(this,t,r);var e=a.alloc.call(this,r-t);return o.call(this,e,0,t,r),e}},{"./buffer-lite":14,"./bufferish":19}],18:[function(t,r,e){var i=t("./bufferish");function n(t){return new Uint8Array(t)}(e=r.exports=i.hasArrayBuffer?n(0):[]).alloc=n,e.concat=i.concat,e.from=function(t){if(i.isView(t)){var r=t.byteOffset,n=t.byteLength;(t=t.buffer).byteLength!==n&&(t.slice?t=t.slice(r,r+n):(t=new Uint8Array(t)).byteLength!==n&&(t=Array.prototype.slice.call(t,r,r+n)))}else{if("string"==typeof t)return i.from.call(e,t);if("number"==typeof t)throw new TypeError('"value" argument must not be a number')}return new Uint8Array(t)}},{"./bufferish":19}],19:[function(t,r,u){var n=u.global=t("./buffer-global"),e=u.hasBuffer=n&&!!n.isBuffer,i=u.hasArrayBuffer="undefined"!=typeof ArrayBuffer,o=u.isArray=t("isarray");u.isArrayBuffer=i?function(t){return t instanceof ArrayBuffer||v(t)}:y;var f=u.isBuffer=e?n.isBuffer:y,a=u.isView=i?ArrayBuffer.isView||g("ArrayBuffer","buffer"):y;u.alloc=p,u.concat=function(t,r){r||(r=0,Array.prototype.forEach.call(t,function(t){r+=t.length}));var n=this!==u&&this||t[0],e=p.call(n,r),i=0;return Array.prototype.forEach.call(t,function(t){i+=h.copy.call(t,e,i)}),e},u.from=function(t){return"string"==typeof t?function(t){var r=3*t.length,n=p.call(this,r),e=h.write.call(n,t);r!==e&&(n=h.slice.call(n,0,e));return n}.call(this,t):d(this).from(t)};var c=u.Array=t("./bufferish-array"),s=u.Buffer=t("./bufferish-buffer"),l=u.Uint8Array=t("./bufferish-uint8array"),h=u.prototype=t("./bufferish-proto");function p(t){return d(this).alloc(t)}var v=g("ArrayBuffer");function d(t){return f(t)?s:a(t)?l:o(t)?c:e?s:i?l:c}function y(){return!1}function g(r,n){return r="[object "+r+"]",function(t){return null!=t&&{}.toString.call(n?t[n]:t)===r}}},{"./buffer-global":13,"./bufferish-array":15,"./bufferish-buffer":16,"./bufferish-proto":17,"./bufferish-uint8array":18,isarray:10}],20:[function(t,r,n){var e=t("isarray");n.createCodec=f,n.install=function(t){for(var r in t)u.prototype[r]=o(u.prototype[r],t[r])},n.filter=function(t){return e(t)?function(r){return r=r.slice(),function(t){return r.reduce(n,t)};function n(t,r){return r(t)}}(t):t};var i=t("./bufferish");function u(t){if(!(this instanceof u))return new u(t);this.options=t,this.init()}function o(t,r){return t&&r?function(){return t.apply(this,arguments),r.apply(this,arguments)}:t||r}function f(t){return new u(t)}u.prototype.init=function(){var t=this.options;return t&&t.uint8array&&(this.bufferish=i.Uint8Array),this},n.preset=f({preset:!0})},{"./bufferish":19,isarray:10}],21:[function(t,r,n){t("./read-core"),t("./write-core"),n.codec={preset:t("./codec-base").preset}},{"./codec-base":20,"./read-core":33,"./write-core":36}],22:[function(t,r,n){n.DecodeBuffer=i;var e=t("./read-core").preset;function i(t){if(!(this instanceof i))return new i(t);if(t&&(this.options=t).codec){var r=this.codec=t.codec;r.bufferish&&(this.bufferish=r.bufferish)}}t("./flex-buffer").FlexDecoder.mixin(i.prototype),i.prototype.codec=e,i.prototype.fetch=function(){return this.codec.decode(this)}},{"./flex-buffer":32,"./read-core":33}],23:[function(t,r,n){n.decode=function(t,r){var n=new e(r);return n.write(t),n.read()};var e=t("./decode-buffer").DecodeBuffer},{"./decode-buffer":22}],24:[function(t,r,n){n.Decoder=u;var e=t("event-lite"),i=t("./decode-buffer").DecodeBuffer;function u(t){if(!(this instanceof u))return new u(t);i.call(this,t)}u.prototype=new i,e.mixin(u.prototype),u.prototype.decode=function(t){arguments.length&&this.write(t),this.flush()},u.prototype.push=function(t){this.emit("data",t)},u.prototype.end=function(t){this.decode(t),this.emit("end")}},{"./decode-buffer":22,"event-lite":7}],25:[function(t,r,n){n.EncodeBuffer=i;var e=t("./write-core").preset;function i(t){if(!(this instanceof i))return new i(t);if(t&&(this.options=t).codec){var r=this.codec=t.codec;r.bufferish&&(this.bufferish=r.bufferish)}}t("./flex-buffer").FlexEncoder.mixin(i.prototype),i.prototype.codec=e,i.prototype.write=function(t){this.codec.encode(this,t)}},{"./flex-buffer":32,"./write-core":36}],26:[function(t,r,n){n.encode=function(t,r){var n=new e(r);return n.write(t),n.read()};var e=t("./encode-buffer").EncodeBuffer},{"./encode-buffer":25}],27:[function(t,r,n){n.Encoder=u;var e=t("event-lite"),i=t("./encode-buffer").EncodeBuffer;function u(t){if(!(this instanceof u))return new u(t);i.call(this,t)}u.prototype=new i,e.mixin(u.prototype),u.prototype.encode=function(t){this.write(t),this.emit("data",this.read())},u.prototype.end=function(t){arguments.length&&this.encode(t),this.flush(),this.emit("end")}},{"./encode-buffer":25,"event-lite":7}],28:[function(t,r,n){n.ExtBuffer=function t(r,n){if(!(this instanceof t))return new t(r,n);this.buffer=e.from(r);this.type=n};var e=t("./bufferish")},{"./bufferish":19}],29:[function(r,t,n){n.setExtPackers=function(t){t.addExtPacker(14,Error,[l,a]),t.addExtPacker(1,EvalError,[l,a]),t.addExtPacker(2,RangeError,[l,a]),t.addExtPacker(3,ReferenceError,[l,a]),t.addExtPacker(4,SyntaxError,[l,a]),t.addExtPacker(5,TypeError,[l,a]),t.addExtPacker(6,URIError,[l,a]),t.addExtPacker(10,RegExp,[s,a]),t.addExtPacker(11,Boolean,[c,a]),t.addExtPacker(12,String,[c,a]),t.addExtPacker(13,Date,[Number,a]),t.addExtPacker(15,Number,[c,a]),"undefined"!=typeof Uint8Array&&(t.addExtPacker(17,Int8Array,o),t.addExtPacker(18,Uint8Array,o),t.addExtPacker(19,Int16Array,o),t.addExtPacker(20,Uint16Array,o),t.addExtPacker(21,Int32Array,o),t.addExtPacker(22,Uint32Array,o),t.addExtPacker(23,Float32Array,o),"undefined"!=typeof Float64Array&&t.addExtPacker(24,Float64Array,o),"undefined"!=typeof Uint8ClampedArray&&t.addExtPacker(25,Uint8ClampedArray,o),t.addExtPacker(26,ArrayBuffer,o),t.addExtPacker(29,DataView,o));i.hasBuffer&&t.addExtPacker(27,u,i.from)};var e,i=r("./bufferish"),u=i.global,o=i.Uint8Array.from,f={name:1,message:1,stack:1,columnNumber:1,fileName:1,lineNumber:1};function a(t){return e||(e=r("./encode").encode),e(t)}function c(t){return t.valueOf()}function s(t){(t=RegExp.prototype.toString.call(t).split("/")).shift();var r=[t.pop()];return r.unshift(t.join("/")),r}function l(t){var r={};for(var n in f)r[n]=t[n];return r}},{"./bufferish":19,"./encode":26}],30:[function(r,t,n){n.setExtUnpackers=function(t){t.addExtUnpacker(14,[f,c(Error)]),t.addExtUnpacker(1,[f,c(EvalError)]),t.addExtUnpacker(2,[f,c(RangeError)]),t.addExtUnpacker(3,[f,c(ReferenceError)]),t.addExtUnpacker(4,[f,c(SyntaxError)]),t.addExtUnpacker(5,[f,c(TypeError)]),t.addExtUnpacker(6,[f,c(URIError)]),t.addExtUnpacker(10,[f,a]),t.addExtUnpacker(11,[f,s(Boolean)]),t.addExtUnpacker(12,[f,s(String)]),t.addExtUnpacker(13,[f,s(Date)]),t.addExtUnpacker(15,[f,s(Number)]),"undefined"!=typeof Uint8Array&&(t.addExtUnpacker(17,s(Int8Array)),t.addExtUnpacker(18,s(Uint8Array)),t.addExtUnpacker(19,[l,s(Int16Array)]),t.addExtUnpacker(20,[l,s(Uint16Array)]),t.addExtUnpacker(21,[l,s(Int32Array)]),t.addExtUnpacker(22,[l,s(Uint32Array)]),t.addExtUnpacker(23,[l,s(Float32Array)]),"undefined"!=typeof Float64Array&&t.addExtUnpacker(24,[l,s(Float64Array)]),"undefined"!=typeof Uint8ClampedArray&&t.addExtUnpacker(25,s(Uint8ClampedArray)),t.addExtUnpacker(26,l),t.addExtUnpacker(29,[l,s(DataView)]));i.hasBuffer&&t.addExtUnpacker(27,s(u))};var e,i=r("./bufferish"),u=i.global,o={name:1,message:1,stack:1,columnNumber:1,fileName:1,lineNumber:1};function f(t){return e||(e=r("./decode").decode),e(t)}function a(t){return RegExp.apply(null,t)}function c(e){return function(t){var r=new e;for(var n in o)r[n]=t[n];return r}}function s(r){return function(t){return new r(t)}}function l(t){return new Uint8Array(t).buffer}},{"./bufferish":19,"./decode":23}],31:[function(t,r,n){t("./read-core"),t("./write-core"),n.createCodec=t("./codec-base").createCodec},{"./codec-base":20,"./read-core":33,"./write-core":36}],32:[function(t,r,n){n.FlexDecoder=u,n.FlexEncoder=o;var e=t("./bufferish"),i="BUFFER_SHORTAGE";function u(){if(!(this instanceof u))return new u}function o(){if(!(this instanceof o))return new o}function f(){throw new Error("method not implemented: write()")}function a(){throw new Error("method not implemented: fetch()")}function c(){return this.buffers&&this.buffers.length?(this.flush(),this.pull()):this.fetch()}function s(t){(this.buffers||(this.buffers=[])).push(t)}function l(){return(this.buffers||(this.buffers=[])).shift()}function h(n){return function(t){for(var r in n)t[r]=n[r];return t}}u.mixin=h({bufferish:e,write:function(t){var r=this.offset?e.prototype.slice.call(this.buffer,this.offset):this.buffer;this.buffer=r?t?this.bufferish.concat([r,t]):r:t,this.offset=0},fetch:a,flush:function(){for(;this.offset<this.buffer.length;){var t,r=this.offset;try{t=this.fetch()}catch(t){if(t&&t.message!=i)throw t;this.offset=r;break}this.push(t)}},push:s,pull:l,read:c,reserve:function(t){var r=this.offset,n=r+t;if(n>this.buffer.length)throw new Error(i);return this.offset=n,r},offset:0}),u.mixin(u.prototype),o.mixin=h({bufferish:e,write:f,fetch:function(){var t=this.start;if(t<this.offset){var r=this.start=this.offset;return e.prototype.slice.call(this.buffer,t,r)}},flush:function(){for(;this.start<this.offset;){var t=this.fetch();t&&this.push(t)}},push:s,pull:function(){var t=this.buffers||(this.buffers=[]),r=1<t.length?this.bufferish.concat(t):t[0];return t.length=0,r},read:c,reserve:function(t){var r=0|t;if(this.buffer){var n=this.buffer.length,e=0|this.offset,i=e+r;if(i<n)return this.offset=i,e;this.flush(),t=Math.max(t,Math.min(2*n,this.maxBufferSize))}return t=Math.max(t,this.minBufferSize),this.buffer=this.bufferish.alloc(t),this.start=0,this.offset=r,0},send:function(t){var r=t.length;if(r>this.minBufferSize)this.flush(),this.push(t);else{var n=this.reserve(r);e.prototype.copy.call(t,this.buffer,n)}},maxBufferSize:65536,minBufferSize:2048,offset:0,start:0}),o.mixin(o.prototype)},{"./bufferish":19}],33:[function(t,r,n){var e=t("./ext-buffer").ExtBuffer,i=t("./ext-unpacker"),u=t("./read-format").readUint8,o=t("./read-token"),f=t("./codec-base");function a(){var t,e,r=this.options;return this.decode=(t=r,e=o.getReadToken(t),function(t){var r=u(t),n=e[r];if(!n)throw new Error("Invalid type: "+(r?"0x"+r.toString(16):r));return n(t)}),r&&r.preset&&i.setExtUnpackers(this),this}f.install({addExtUnpacker:function(t,r){(this.extUnpackers||(this.extUnpackers=[]))[t]=f.filter(r)},getExtUnpacker:function(r){return(this.extUnpackers||(this.extUnpackers=[]))[r]||function(t){return new e(t,r)}},init:a}),n.preset=a.call(f.preset)},{"./codec-base":20,"./ext-buffer":28,"./ext-unpacker":30,"./read-format":34,"./read-token":35}],34:[function(t,r,n){var e=t("ieee754"),i=t("int64-buffer"),u=i.Uint64BE,o=i.Int64BE;n.getReadFormat=function(t){var r=f.hasArrayBuffer&&t&&t.binarraybuffer,n=t&&t.int64;return{map:c&&t&&t.usemap?h:l,array:p,str:v,bin:r?y:d,ext:g,uint8:_,uint16:w,uint32:E,uint64:A(8,n?U:k),int8:b,int16:m,int32:x,int64:A(8,n?I:B),float32:A(4,j),float64:A(8,S)}},n.readUint8=_;var f=t("./bufferish"),a=t("./bufferish-proto"),c="undefined"!=typeof Map,s=!0;function l(t,r){var n,e={},i=new Array(r),u=new Array(r),o=t.codec.decode;for(n=0;n<r;n++)i[n]=o(t),u[n]=o(t);for(n=0;n<r;n++)e[i[n]]=u[n];return e}function h(t,r){var n,e=new Map,i=new Array(r),u=new Array(r),o=t.codec.decode;for(n=0;n<r;n++)i[n]=o(t),u[n]=o(t);for(n=0;n<r;n++)e.set(i[n],u[n]);return e}function p(t,r){for(var n=new Array(r),e=t.codec.decode,i=0;i<r;i++)n[i]=e(t);return n}function v(t,r){var n=t.reserve(r),e=n+r;return a.toString.call(t.buffer,"utf-8",n,e)}function d(t,r){var n=t.reserve(r),e=n+r,i=a.slice.call(t.buffer,n,e);return f.from(i)}function y(t,r){var n=t.reserve(r),e=n+r,i=a.slice.call(t.buffer,n,e);return f.Uint8Array.from(i).buffer}function g(t,r){var n=t.reserve(r+1),e=t.buffer[n++],i=n+r,u=t.codec.getExtUnpacker(e);if(!u)throw new Error("Invalid ext type: "+(e?"0x"+e.toString(16):e));return u(a.slice.call(t.buffer,n,i))}function _(t){var r=t.reserve(1);return t.buffer[r]}function b(t){var r=t.reserve(1),n=t.buffer[r];return 128&n?n-256:n}function w(t){var r=t.reserve(2),n=t.buffer;return n[r++]<<8|n[r]}function m(t){var r=t.reserve(2),n=t.buffer,e=n[r++]<<8|n[r];return 32768&e?e-65536:e}function E(t){var r=t.reserve(4),n=t.buffer;return 16777216*n[r++]+(n[r++]<<16)+(n[r++]<<8)+n[r]}function x(t){var r=t.reserve(4),n=t.buffer;return n[r++]<<24|n[r++]<<16|n[r++]<<8|n[r]}function A(n,e){return function(t){var r=t.reserve(n);return e.call(t.buffer,r,s)}}function k(t){return new u(this,t).toNumber()}function B(t){return new o(this,t).toNumber()}function U(t){return new u(this,t)}function I(t){return new o(this,t)}function j(t){return e.read(this,t,!1,23,4)}function S(t){return e.read(this,t,!1,52,8)}},{"./bufferish":19,"./bufferish-proto":17,ieee754:8,"int64-buffer":9}],35:[function(t,r,n){var e=t("./read-format");function i(t){var r,n=new Array(256);for(r=0;r<=127;r++)n[r]=u(r);for(r=128;r<=143;r++)n[r]=f(r-128,t.map);for(r=144;r<=159;r++)n[r]=f(r-144,t.array);for(r=160;r<=191;r++)n[r]=f(r-160,t.str);for(n[192]=u(null),n[193]=null,n[194]=u(!1),n[195]=u(!0),n[196]=o(t.uint8,t.bin),n[197]=o(t.uint16,t.bin),n[198]=o(t.uint32,t.bin),n[199]=o(t.uint8,t.ext),n[200]=o(t.uint16,t.ext),n[201]=o(t.uint32,t.ext),n[202]=t.float32,n[203]=t.float64,n[204]=t.uint8,n[205]=t.uint16,n[206]=t.uint32,n[207]=t.uint64,n[208]=t.int8,n[209]=t.int16,n[210]=t.int32,n[211]=t.int64,n[212]=f(1,t.ext),n[213]=f(2,t.ext),n[214]=f(4,t.ext),n[215]=f(8,t.ext),n[216]=f(16,t.ext),n[217]=o(t.uint8,t.str),n[218]=o(t.uint16,t.str),n[219]=o(t.uint32,t.str),n[220]=o(t.uint16,t.array),n[221]=o(t.uint32,t.array),n[222]=o(t.uint16,t.map),n[223]=o(t.uint32,t.map),r=224;r<=255;r++)n[r]=u(r-256);return n}function u(t){return function(){return t}}function o(n,e){return function(t){var r=n(t);return e(t,r)}}function f(r,n){return function(t){return n(t,r)}}n.getReadToken=function(t){var r=e.getReadFormat(t);return t&&t.useraw?function(t){var r,n=i(t).slice();for(n[217]=n[196],n[218]=n[197],n[219]=n[198],r=160;r<=191;r++)n[r]=f(r-160,t.bin);return n}(r):i(r)}},{"./read-format":34}],36:[function(t,r,n){var f=t("./ext-buffer").ExtBuffer,i=t("./ext-packer"),u=t("./write-type"),a=t("./codec-base");function e(){var t,e,r=this.options;return this.encode=(t=r,e=u.getWriteType(t),function(t,r){var n=e[typeof r];if(!n)throw new Error('Unsupported type "'+typeof r+'": '+r);n(t,r)}),r&&r.preset&&i.setExtPackers(this),this}a.install({addExtPacker:function(r,t,n){n=a.filter(n);var e=t.name;if(e&&"Object"!==e){var i=this.extPackers||(this.extPackers={});i[e]=o}else{var u=this.extEncoderList||(this.extEncoderList=[]);u.unshift([t,o])}function o(t){return n&&(t=n(t)),new f(t,r)}},getExtPacker:function(t){var r=this.extPackers||(this.extPackers={}),n=t.constructor,e=n&&n.name&&r[n.name];if(e)return e;for(var i=this.extEncoderList||(this.extEncoderList=[]),u=i.length,o=0;o<u;o++){var f=i[o];if(n===f[0])return f[1]}},init:e}),n.preset=e.call(a.preset)},{"./codec-base":20,"./ext-buffer":28,"./ext-packer":29,"./write-type":38}],37:[function(t,r,n){var e=t("ieee754"),i=t("int64-buffer"),u=i.Uint64BE,o=i.Int64BE,f=t("./write-uint8").uint8,a=t("./bufferish"),c=a.global,s=a.hasBuffer&&"TYPED_ARRAY_SUPPORT"in c&&!c.TYPED_ARRAY_SUPPORT,l=a.hasBuffer&&c.prototype||{};function h(){var t=f.slice();return t[196]=p(196),t[197]=v(197),t[198]=d(198),t[199]=p(199),t[200]=v(200),t[201]=d(201),t[202]=y(202,4,l.writeFloatBE||b,!0),t[203]=y(203,8,l.writeDoubleBE||w,!0),t[204]=p(204),t[205]=v(205),t[206]=d(206),t[207]=y(207,8,g),t[208]=p(208),t[209]=v(209),t[210]=d(210),t[211]=y(211,8,_),t[217]=p(217),t[218]=v(218),t[219]=d(219),t[220]=v(220),t[221]=d(221),t[222]=v(222),t[223]=d(223),t}function p(i){return function(t,r){var n=t.reserve(2),e=t.buffer;e[n++]=i,e[n]=r}}function v(i){return function(t,r){var n=t.reserve(3),e=t.buffer;e[n++]=i,e[n++]=r>>>8,e[n]=r}}function d(i){return function(t,r){var n=t.reserve(5),e=t.buffer;e[n++]=i,e[n++]=r>>>24,e[n++]=r>>>16,e[n++]=r>>>8,e[n]=r}}function y(e,i,u,o){return function(t,r){var n=t.reserve(i+1);t.buffer[n++]=e,u.call(t.buffer,r,n,o)}}function g(t,r){new u(this,r,t)}function _(t,r){new o(this,r,t)}function b(t,r){e.write(this,t,r,!1,23,4)}function w(t,r){e.write(this,t,r,!1,52,8)}n.getWriteToken=function(t){return t&&t.uint8array?((n=h())[202]=y(202,4,b),n[203]=y(203,8,w),n):s||a.hasBuffer&&t&&t.safe?((r=f.slice())[196]=y(196,1,c.prototype.writeUInt8),r[197]=y(197,2,c.prototype.writeUInt16BE),r[198]=y(198,4,c.prototype.writeUInt32BE),r[199]=y(199,1,c.prototype.writeUInt8),r[200]=y(200,2,c.prototype.writeUInt16BE),r[201]=y(201,4,c.prototype.writeUInt32BE),r[202]=y(202,4,c.prototype.writeFloatBE),r[203]=y(203,8,c.prototype.writeDoubleBE),r[204]=y(204,1,c.prototype.writeUInt8),r[205]=y(205,2,c.prototype.writeUInt16BE),r[206]=y(206,4,c.prototype.writeUInt32BE),r[207]=y(207,8,g),r[208]=y(208,1,c.prototype.writeInt8),r[209]=y(209,2,c.prototype.writeInt16BE),r[210]=y(210,4,c.prototype.writeInt32BE),r[211]=y(211,8,_),r[217]=y(217,1,c.prototype.writeUInt8),r[218]=y(218,2,c.prototype.writeUInt16BE),r[219]=y(219,4,c.prototype.writeUInt32BE),r[220]=y(220,2,c.prototype.writeUInt16BE),r[221]=y(221,4,c.prototype.writeUInt32BE),r[222]=y(222,2,c.prototype.writeUInt16BE),r[223]=y(223,4,c.prototype.writeUInt32BE),r):h();var r;var n}},{"./bufferish":19,"./write-uint8":39,ieee754:8,"int64-buffer":9}],38:[function(t,r,n){var g=t("isarray"),e=t("int64-buffer"),_=e.Uint64BE,b=e.Int64BE,i=t("./bufferish"),l=t("./bufferish-proto"),f=t("./write-token"),w=t("./write-uint8").uint8,m=t("./ext-buffer").ExtBuffer,a="undefined"!=typeof Uint8Array,c="undefined"!=typeof Map,E=[];E[1]=212,E[2]=213,E[4]=214,E[8]=215,E[16]=216,n.getWriteType=function(t){var h=f.getWriteToken(t),r=t&&t.useraw,n=a&&t&&t.binarraybuffer,p=n?i.isArrayBuffer:i.isBuffer,v=n?function(t,r){e(t,new Uint8Array(r))}:e,d=c&&t&&t.usemap?function(e,t){if(!(t instanceof Map))return o(e,t);var r=t.size;h[r<16?128+r:r<=65535?222:223](e,r);var i=e.codec.encode;t.forEach(function(t,r,n){i(e,r),i(e,t)})}:o;return{boolean:function(t,r){h[r?195:194](t,r)},function:y,number:function(t,r){var n,e=0|r;{if(r!==e)return void h[n=203](t,r);n=-32<=e&&e<=127?255&e:0<=e?e<=255?204:e<=65535?205:206:-128<=e?208:-32768<=e?209:210}h[n](t,e)},object:r?function(t,r){if(p(r))return n=t,e=r,i=e.length,h[i<32?160+i:i<=65535?218:219](n,i),void n.send(e);var n,e,i;u(t,r)}:u,string:(s=r?function(t){return t<32?1:t<=65535?3:5}:function(t){return t<32?1:t<=255?2:t<=65535?3:5},function(t,r){var n=r.length,e=5+3*n;t.offset=t.reserve(e);var i=t.buffer,u=s(n),o=t.offset+u;n=l.write.call(i,r,o);var f=s(n);if(u!==f){var a=o+f-u,c=o+n;l.copy.call(i,i,a,o,c)}h[1===f?160+n:f<=3?215+f:219](t,n),t.offset+=n}),symbol:y,undefined:y};var s;function u(t,r){if(null===r)return y(t,r);if(p(r))return v(t,r);if(g(r))return function(t,r){var n=r.length;h[n<16?144+n:n<=65535?220:221](t,n);for(var e=t.codec.encode,i=0;i<n;i++)e(t,r[i])}(t,r);if(_.isUint64BE(r))return n=t,e=r,void h[207](n,e.toArray());var n,e,i,u;if(b.isInt64BE(r))return i=t,u=r,void h[211](i,u.toArray());var o,f,a,c,s,l=t.codec.getExtPacker(r);if(l&&(r=l(r)),r instanceof m)return o=t,a=(f=r).buffer,c=a.length,s=E[c]||(c<255?199:c<=65535?200:201),h[s](o,c),w[f.type](o),void o.send(a);d(t,r)}function y(t,r){h[192](t,r)}function e(t,r){var n=r.length,e=n<255?196:n<=65535?197:198;h[e](t,n),t.send(r)}function o(r,n){var t=Object.keys(n),e=t.length,i=e<16?128+e:e<=65535?222:223;h[i](r,e);var u=r.codec.encode;t.forEach(function(t){u(r,t),u(r,n[t])})}}},{"./bufferish":19,"./bufferish-proto":17,"./ext-buffer":28,"./write-token":37,"./write-uint8":39,"int64-buffer":9,isarray:10}],39:[function(t,r,n){for(var e=n.uint8=new Array(256),i=0;i<=255;i++)e[i]=u(i);function u(n){return function(t){var r=t.reserve(1);t.buffer[r]=n}}},{}]},{},[1,2,3])(3)});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],44:[function(require,module,exports){

/**
 * Module dependencies.
 */

var url = require('./url');
var parser = require('socket.io-parser');
var Manager = require('./manager');
var debug = require('debug')('socket.io-client');

/**
 * Module exports.
 */

module.exports = exports = lookup;

/**
 * Managers cache.
 */

var cache = exports.managers = {};

/**
 * Looks up an existing `Manager` for multiplexing.
 * If the user summons:
 *
 *   `io('http://localhost/a');`
 *   `io('http://localhost/b');`
 *
 * We reuse the existing instance based on same scheme/port/host,
 * and we initialize sockets for each namespace.
 *
 * @api public
 */

function lookup (uri, opts) {
  if (typeof uri === 'object') {
    opts = uri;
    uri = undefined;
  }

  opts = opts || {};

  var parsed = url(uri);
  var source = parsed.source;
  var id = parsed.id;
  var path = parsed.path;
  var sameNamespace = cache[id] && path in cache[id].nsps;
  var newConnection = opts.forceNew || opts['force new connection'] ||
                      false === opts.multiplex || sameNamespace;

  var io;

  if (newConnection) {
    debug('ignoring socket cache for %s', source);
    io = Manager(source, opts);
  } else {
    if (!cache[id]) {
      debug('new io instance for %s', source);
      cache[id] = Manager(source, opts);
    }
    io = cache[id];
  }
  if (parsed.query && !opts.query) {
    opts.query = parsed.query;
  }
  return io.socket(parsed.path, opts);
}

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = parser.protocol;

/**
 * `connect`.
 *
 * @param {String} uri
 * @api public
 */

exports.connect = lookup;

/**
 * Expose constructors for standalone build.
 *
 * @api public
 */

exports.Manager = require('./manager');
exports.Socket = require('./socket');

},{"./manager":45,"./socket":47,"./url":48,"debug":19,"socket.io-parser":50}],45:[function(require,module,exports){

/**
 * Module dependencies.
 */

var eio = require('engine.io-client');
var Socket = require('./socket');
var Emitter = require('component-emitter');
var parser = require('socket.io-parser');
var on = require('./on');
var bind = require('component-bind');
var debug = require('debug')('socket.io-client:manager');
var indexOf = require('indexof');
var Backoff = require('backo2');

/**
 * IE6+ hasOwnProperty
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Module exports
 */

module.exports = Manager;

/**
 * `Manager` constructor.
 *
 * @param {String} engine instance or engine uri/opts
 * @param {Object} options
 * @api public
 */

function Manager (uri, opts) {
  if (!(this instanceof Manager)) return new Manager(uri, opts);
  if (uri && ('object' === typeof uri)) {
    opts = uri;
    uri = undefined;
  }
  opts = opts || {};

  opts.path = opts.path || '/socket.io';
  this.nsps = {};
  this.subs = [];
  this.opts = opts;
  this.reconnection(opts.reconnection !== false);
  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
  this.reconnectionDelay(opts.reconnectionDelay || 1000);
  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
  this.randomizationFactor(opts.randomizationFactor || 0.5);
  this.backoff = new Backoff({
    min: this.reconnectionDelay(),
    max: this.reconnectionDelayMax(),
    jitter: this.randomizationFactor()
  });
  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
  this.readyState = 'closed';
  this.uri = uri;
  this.connecting = [];
  this.lastPing = null;
  this.encoding = false;
  this.packetBuffer = [];
  var _parser = opts.parser || parser;
  this.encoder = new _parser.Encoder();
  this.decoder = new _parser.Decoder();
  this.autoConnect = opts.autoConnect !== false;
  if (this.autoConnect) this.open();
}

/**
 * Propagate given event to sockets and emit on `this`
 *
 * @api private
 */

Manager.prototype.emitAll = function () {
  this.emit.apply(this, arguments);
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
    }
  }
};

/**
 * Update `socket.id` of all sockets
 *
 * @api private
 */

Manager.prototype.updateSocketIds = function () {
  for (var nsp in this.nsps) {
    if (has.call(this.nsps, nsp)) {
      this.nsps[nsp].id = this.generateId(nsp);
    }
  }
};

/**
 * generate `socket.id` for the given `nsp`
 *
 * @param {String} nsp
 * @return {String}
 * @api private
 */

Manager.prototype.generateId = function (nsp) {
  return (nsp === '/' ? '' : (nsp + '#')) + this.engine.id;
};

/**
 * Mix in `Emitter`.
 */

Emitter(Manager.prototype);

/**
 * Sets the `reconnection` config.
 *
 * @param {Boolean} true/false if it should automatically reconnect
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnection = function (v) {
  if (!arguments.length) return this._reconnection;
  this._reconnection = !!v;
  return this;
};

/**
 * Sets the reconnection attempts config.
 *
 * @param {Number} max reconnection attempts before giving up
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionAttempts = function (v) {
  if (!arguments.length) return this._reconnectionAttempts;
  this._reconnectionAttempts = v;
  return this;
};

/**
 * Sets the delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelay = function (v) {
  if (!arguments.length) return this._reconnectionDelay;
  this._reconnectionDelay = v;
  this.backoff && this.backoff.setMin(v);
  return this;
};

Manager.prototype.randomizationFactor = function (v) {
  if (!arguments.length) return this._randomizationFactor;
  this._randomizationFactor = v;
  this.backoff && this.backoff.setJitter(v);
  return this;
};

/**
 * Sets the maximum delay between reconnections.
 *
 * @param {Number} delay
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.reconnectionDelayMax = function (v) {
  if (!arguments.length) return this._reconnectionDelayMax;
  this._reconnectionDelayMax = v;
  this.backoff && this.backoff.setMax(v);
  return this;
};

/**
 * Sets the connection timeout. `false` to disable
 *
 * @return {Manager} self or value
 * @api public
 */

Manager.prototype.timeout = function (v) {
  if (!arguments.length) return this._timeout;
  this._timeout = v;
  return this;
};

/**
 * Starts trying to reconnect if reconnection is enabled and we have not
 * started reconnecting yet
 *
 * @api private
 */

Manager.prototype.maybeReconnectOnOpen = function () {
  // Only try to reconnect if it's the first time we're connecting
  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
    // keeps reconnection from firing twice for the same reconnection loop
    this.reconnect();
  }
};

/**
 * Sets the current transport `socket`.
 *
 * @param {Function} optional, callback
 * @return {Manager} self
 * @api public
 */

Manager.prototype.open =
Manager.prototype.connect = function (fn, opts) {
  debug('readyState %s', this.readyState);
  if (~this.readyState.indexOf('open')) return this;

  debug('opening %s', this.uri);
  this.engine = eio(this.uri, this.opts);
  var socket = this.engine;
  var self = this;
  this.readyState = 'opening';
  this.skipReconnect = false;

  // emit `open`
  var openSub = on(socket, 'open', function () {
    self.onopen();
    fn && fn();
  });

  // emit `connect_error`
  var errorSub = on(socket, 'error', function (data) {
    debug('connect_error');
    self.cleanup();
    self.readyState = 'closed';
    self.emitAll('connect_error', data);
    if (fn) {
      var err = new Error('Connection error');
      err.data = data;
      fn(err);
    } else {
      // Only do this if there is no fn to handle the error
      self.maybeReconnectOnOpen();
    }
  });

  // emit `connect_timeout`
  if (false !== this._timeout) {
    var timeout = this._timeout;
    debug('connect attempt will timeout after %d', timeout);

    // set timer
    var timer = setTimeout(function () {
      debug('connect attempt timed out after %d', timeout);
      openSub.destroy();
      socket.close();
      socket.emit('error', 'timeout');
      self.emitAll('connect_timeout', timeout);
    }, timeout);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }

  this.subs.push(openSub);
  this.subs.push(errorSub);

  return this;
};

/**
 * Called upon transport open.
 *
 * @api private
 */

Manager.prototype.onopen = function () {
  debug('open');

  // clear old subs
  this.cleanup();

  // mark as open
  this.readyState = 'open';
  this.emit('open');

  // add new subs
  var socket = this.engine;
  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
};

/**
 * Called upon a ping.
 *
 * @api private
 */

Manager.prototype.onping = function () {
  this.lastPing = new Date();
  this.emitAll('ping');
};

/**
 * Called upon a packet.
 *
 * @api private
 */

Manager.prototype.onpong = function () {
  this.emitAll('pong', new Date() - this.lastPing);
};

/**
 * Called with data.
 *
 * @api private
 */

Manager.prototype.ondata = function (data) {
  this.decoder.add(data);
};

/**
 * Called when parser fully decodes a packet.
 *
 * @api private
 */

Manager.prototype.ondecoded = function (packet) {
  this.emit('packet', packet);
};

/**
 * Called upon socket error.
 *
 * @api private
 */

Manager.prototype.onerror = function (err) {
  debug('error', err);
  this.emitAll('error', err);
};

/**
 * Creates a new socket for the given `nsp`.
 *
 * @return {Socket}
 * @api public
 */

Manager.prototype.socket = function (nsp, opts) {
  var socket = this.nsps[nsp];
  if (!socket) {
    socket = new Socket(this, nsp, opts);
    this.nsps[nsp] = socket;
    var self = this;
    socket.on('connecting', onConnecting);
    socket.on('connect', function () {
      socket.id = self.generateId(nsp);
    });

    if (this.autoConnect) {
      // manually call here since connecting event is fired before listening
      onConnecting();
    }
  }

  function onConnecting () {
    if (!~indexOf(self.connecting, socket)) {
      self.connecting.push(socket);
    }
  }

  return socket;
};

/**
 * Called upon a socket close.
 *
 * @param {Socket} socket
 */

Manager.prototype.destroy = function (socket) {
  var index = indexOf(this.connecting, socket);
  if (~index) this.connecting.splice(index, 1);
  if (this.connecting.length) return;

  this.close();
};

/**
 * Writes a packet.
 *
 * @param {Object} packet
 * @api private
 */

Manager.prototype.packet = function (packet) {
  debug('writing packet %j', packet);
  var self = this;
  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

  if (!self.encoding) {
    // encode, then write to engine with result
    self.encoding = true;
    this.encoder.encode(packet, function (encodedPackets) {
      for (var i = 0; i < encodedPackets.length; i++) {
        self.engine.write(encodedPackets[i], packet.options);
      }
      self.encoding = false;
      self.processPacketQueue();
    });
  } else { // add packet to the queue
    self.packetBuffer.push(packet);
  }
};

/**
 * If packet buffer is non-empty, begins encoding the
 * next packet in line.
 *
 * @api private
 */

Manager.prototype.processPacketQueue = function () {
  if (this.packetBuffer.length > 0 && !this.encoding) {
    var pack = this.packetBuffer.shift();
    this.packet(pack);
  }
};

/**
 * Clean up transport subscriptions and packet buffer.
 *
 * @api private
 */

Manager.prototype.cleanup = function () {
  debug('cleanup');

  var subsLength = this.subs.length;
  for (var i = 0; i < subsLength; i++) {
    var sub = this.subs.shift();
    sub.destroy();
  }

  this.packetBuffer = [];
  this.encoding = false;
  this.lastPing = null;

  this.decoder.destroy();
};

/**
 * Close the current socket.
 *
 * @api private
 */

Manager.prototype.close =
Manager.prototype.disconnect = function () {
  debug('disconnect');
  this.skipReconnect = true;
  this.reconnecting = false;
  if ('opening' === this.readyState) {
    // `onclose` will not fire because
    // an open event never happened
    this.cleanup();
  }
  this.backoff.reset();
  this.readyState = 'closed';
  if (this.engine) this.engine.close();
};

/**
 * Called upon engine close.
 *
 * @api private
 */

Manager.prototype.onclose = function (reason) {
  debug('onclose');

  this.cleanup();
  this.backoff.reset();
  this.readyState = 'closed';
  this.emit('close', reason);

  if (this._reconnection && !this.skipReconnect) {
    this.reconnect();
  }
};

/**
 * Attempt a reconnection.
 *
 * @api private
 */

Manager.prototype.reconnect = function () {
  if (this.reconnecting || this.skipReconnect) return this;

  var self = this;

  if (this.backoff.attempts >= this._reconnectionAttempts) {
    debug('reconnect failed');
    this.backoff.reset();
    this.emitAll('reconnect_failed');
    this.reconnecting = false;
  } else {
    var delay = this.backoff.duration();
    debug('will wait %dms before reconnect attempt', delay);

    this.reconnecting = true;
    var timer = setTimeout(function () {
      if (self.skipReconnect) return;

      debug('attempting reconnect');
      self.emitAll('reconnect_attempt', self.backoff.attempts);
      self.emitAll('reconnecting', self.backoff.attempts);

      // check again for the case socket closed in above events
      if (self.skipReconnect) return;

      self.open(function (err) {
        if (err) {
          debug('reconnect attempt error');
          self.reconnecting = false;
          self.reconnect();
          self.emitAll('reconnect_error', err.data);
        } else {
          debug('reconnect success');
          self.onreconnect();
        }
      });
    }, delay);

    this.subs.push({
      destroy: function () {
        clearTimeout(timer);
      }
    });
  }
};

/**
 * Called upon successful reconnect.
 *
 * @api private
 */

Manager.prototype.onreconnect = function () {
  var attempt = this.backoff.attempts;
  this.reconnecting = false;
  this.backoff.reset();
  this.updateSocketIds();
  this.emitAll('reconnect', attempt);
};

},{"./on":46,"./socket":47,"backo2":10,"component-bind":16,"component-emitter":17,"debug":19,"engine.io-client":21,"indexof":37,"socket.io-parser":50}],46:[function(require,module,exports){

/**
 * Module exports.
 */

module.exports = on;

/**
 * Helper for subscriptions.
 *
 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
 * @param {String} event name
 * @param {Function} callback
 * @api public
 */

function on (obj, ev, fn) {
  obj.on(ev, fn);
  return {
    destroy: function () {
      obj.removeListener(ev, fn);
    }
  };
}

},{}],47:[function(require,module,exports){

/**
 * Module dependencies.
 */

var parser = require('socket.io-parser');
var Emitter = require('component-emitter');
var toArray = require('to-array');
var on = require('./on');
var bind = require('component-bind');
var debug = require('debug')('socket.io-client:socket');
var parseqs = require('parseqs');
var hasBin = require('has-binary2');

/**
 * Module exports.
 */

module.exports = exports = Socket;

/**
 * Internal events (blacklisted).
 * These events can't be emitted by the user.
 *
 * @api private
 */

var events = {
  connect: 1,
  connect_error: 1,
  connect_timeout: 1,
  connecting: 1,
  disconnect: 1,
  error: 1,
  reconnect: 1,
  reconnect_attempt: 1,
  reconnect_failed: 1,
  reconnect_error: 1,
  reconnecting: 1,
  ping: 1,
  pong: 1
};

/**
 * Shortcut to `Emitter#emit`.
 */

var emit = Emitter.prototype.emit;

/**
 * `Socket` constructor.
 *
 * @api public
 */

function Socket (io, nsp, opts) {
  this.io = io;
  this.nsp = nsp;
  this.json = this; // compat
  this.ids = 0;
  this.acks = {};
  this.receiveBuffer = [];
  this.sendBuffer = [];
  this.connected = false;
  this.disconnected = true;
  this.flags = {};
  if (opts && opts.query) {
    this.query = opts.query;
  }
  if (this.io.autoConnect) this.open();
}

/**
 * Mix in `Emitter`.
 */

Emitter(Socket.prototype);

/**
 * Subscribe to open, close and packet events
 *
 * @api private
 */

Socket.prototype.subEvents = function () {
  if (this.subs) return;

  var io = this.io;
  this.subs = [
    on(io, 'open', bind(this, 'onopen')),
    on(io, 'packet', bind(this, 'onpacket')),
    on(io, 'close', bind(this, 'onclose'))
  ];
};

/**
 * "Opens" the socket.
 *
 * @api public
 */

Socket.prototype.open =
Socket.prototype.connect = function () {
  if (this.connected) return this;

  this.subEvents();
  this.io.open(); // ensure open
  if ('open' === this.io.readyState) this.onopen();
  this.emit('connecting');
  return this;
};

/**
 * Sends a `message` event.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.send = function () {
  var args = toArray(arguments);
  args.unshift('message');
  this.emit.apply(this, args);
  return this;
};

/**
 * Override `emit`.
 * If the event is in `events`, it's emitted normally.
 *
 * @param {String} event name
 * @return {Socket} self
 * @api public
 */

Socket.prototype.emit = function (ev) {
  if (events.hasOwnProperty(ev)) {
    emit.apply(this, arguments);
    return this;
  }

  var args = toArray(arguments);
  var packet = {
    type: (this.flags.binary !== undefined ? this.flags.binary : hasBin(args)) ? parser.BINARY_EVENT : parser.EVENT,
    data: args
  };

  packet.options = {};
  packet.options.compress = !this.flags || false !== this.flags.compress;

  // event ack callback
  if ('function' === typeof args[args.length - 1]) {
    debug('emitting packet with ack id %d', this.ids);
    this.acks[this.ids] = args.pop();
    packet.id = this.ids++;
  }

  if (this.connected) {
    this.packet(packet);
  } else {
    this.sendBuffer.push(packet);
  }

  this.flags = {};

  return this;
};

/**
 * Sends a packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.packet = function (packet) {
  packet.nsp = this.nsp;
  this.io.packet(packet);
};

/**
 * Called upon engine `open`.
 *
 * @api private
 */

Socket.prototype.onopen = function () {
  debug('transport is open - connecting');

  // write connect packet if necessary
  if ('/' !== this.nsp) {
    if (this.query) {
      var query = typeof this.query === 'object' ? parseqs.encode(this.query) : this.query;
      debug('sending connect packet with query %s', query);
      this.packet({type: parser.CONNECT, query: query});
    } else {
      this.packet({type: parser.CONNECT});
    }
  }
};

/**
 * Called upon engine `close`.
 *
 * @param {String} reason
 * @api private
 */

Socket.prototype.onclose = function (reason) {
  debug('close (%s)', reason);
  this.connected = false;
  this.disconnected = true;
  delete this.id;
  this.emit('disconnect', reason);
};

/**
 * Called with socket packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onpacket = function (packet) {
  var sameNamespace = packet.nsp === this.nsp;
  var rootNamespaceError = packet.type === parser.ERROR && packet.nsp === '/';

  if (!sameNamespace && !rootNamespaceError) return;

  switch (packet.type) {
    case parser.CONNECT:
      this.onconnect();
      break;

    case parser.EVENT:
      this.onevent(packet);
      break;

    case parser.BINARY_EVENT:
      this.onevent(packet);
      break;

    case parser.ACK:
      this.onack(packet);
      break;

    case parser.BINARY_ACK:
      this.onack(packet);
      break;

    case parser.DISCONNECT:
      this.ondisconnect();
      break;

    case parser.ERROR:
      this.emit('error', packet.data);
      break;
  }
};

/**
 * Called upon a server event.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onevent = function (packet) {
  var args = packet.data || [];
  debug('emitting event %j', args);

  if (null != packet.id) {
    debug('attaching ack callback to event');
    args.push(this.ack(packet.id));
  }

  if (this.connected) {
    emit.apply(this, args);
  } else {
    this.receiveBuffer.push(args);
  }
};

/**
 * Produces an ack callback to emit with an event.
 *
 * @api private
 */

Socket.prototype.ack = function (id) {
  var self = this;
  var sent = false;
  return function () {
    // prevent double callbacks
    if (sent) return;
    sent = true;
    var args = toArray(arguments);
    debug('sending ack %j', args);

    self.packet({
      type: hasBin(args) ? parser.BINARY_ACK : parser.ACK,
      id: id,
      data: args
    });
  };
};

/**
 * Called upon a server acknowlegement.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onack = function (packet) {
  var ack = this.acks[packet.id];
  if ('function' === typeof ack) {
    debug('calling ack %s with %j', packet.id, packet.data);
    ack.apply(this, packet.data);
    delete this.acks[packet.id];
  } else {
    debug('bad ack %s', packet.id);
  }
};

/**
 * Called upon server connect.
 *
 * @api private
 */

Socket.prototype.onconnect = function () {
  this.connected = true;
  this.disconnected = false;
  this.emit('connect');
  this.emitBuffered();
};

/**
 * Emit buffered events (received and emitted).
 *
 * @api private
 */

Socket.prototype.emitBuffered = function () {
  var i;
  for (i = 0; i < this.receiveBuffer.length; i++) {
    emit.apply(this, this.receiveBuffer[i]);
  }
  this.receiveBuffer = [];

  for (i = 0; i < this.sendBuffer.length; i++) {
    this.packet(this.sendBuffer[i]);
  }
  this.sendBuffer = [];
};

/**
 * Called upon server disconnect.
 *
 * @api private
 */

Socket.prototype.ondisconnect = function () {
  debug('server disconnect (%s)', this.nsp);
  this.destroy();
  this.onclose('io server disconnect');
};

/**
 * Called upon forced client/server side disconnections,
 * this method ensures the manager stops tracking us and
 * that reconnections don't get triggered for this.
 *
 * @api private.
 */

Socket.prototype.destroy = function () {
  if (this.subs) {
    // clean subscriptions to avoid reconnections
    for (var i = 0; i < this.subs.length; i++) {
      this.subs[i].destroy();
    }
    this.subs = null;
  }

  this.io.destroy(this);
};

/**
 * Disconnects the socket manually.
 *
 * @return {Socket} self
 * @api public
 */

Socket.prototype.close =
Socket.prototype.disconnect = function () {
  if (this.connected) {
    debug('performing disconnect (%s)', this.nsp);
    this.packet({ type: parser.DISCONNECT });
  }

  // remove socket from pool
  this.destroy();

  if (this.connected) {
    // fire events
    this.onclose('io client disconnect');
  }
  return this;
};

/**
 * Sets the compress flag.
 *
 * @param {Boolean} if `true`, compresses the sending data
 * @return {Socket} self
 * @api public
 */

Socket.prototype.compress = function (compress) {
  this.flags.compress = compress;
  return this;
};

/**
 * Sets the binary flag
 *
 * @param {Boolean} whether the emitted data contains binary
 * @return {Socket} self
 * @api public
 */

Socket.prototype.binary = function (binary) {
  this.flags.binary = binary;
  return this;
};

},{"./on":46,"component-bind":16,"component-emitter":17,"debug":19,"has-binary2":34,"parseqs":40,"socket.io-parser":50,"to-array":52}],48:[function(require,module,exports){
(function (global){

/**
 * Module dependencies.
 */

var parseuri = require('parseuri');
var debug = require('debug')('socket.io-client:url');

/**
 * Module exports.
 */

module.exports = url;

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
  loc = loc || global.location;
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
    obj = parseuri(uri);
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"debug":19,"parseuri":41}],49:[function(require,module,exports){
(function (global){
/*global Blob,File*/

/**
 * Module requirements
 */

var isArray = require('isarray');
var isBuf = require('./is-buffer');
var toString = Object.prototype.toString;
var withNativeBlob = typeof global.Blob === 'function' || toString.call(global.Blob) === '[object BlobConstructor]';
var withNativeFile = typeof global.File === 'function' || toString.call(global.File) === '[object FileConstructor]';

/**
 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
 * Anything with blobs or files should be fed through removeBlobs before coming
 * here.
 *
 * @param {Object} packet - socket.io event packet
 * @return {Object} with deconstructed packet and list of buffers
 * @api public
 */

exports.deconstructPacket = function(packet) {
  var buffers = [];
  var packetData = packet.data;
  var pack = packet;
  pack.data = _deconstructPacket(packetData, buffers);
  pack.attachments = buffers.length; // number of binary 'attachments'
  return {packet: pack, buffers: buffers};
};

function _deconstructPacket(data, buffers) {
  if (!data) return data;

  if (isBuf(data)) {
    var placeholder = { _placeholder: true, num: buffers.length };
    buffers.push(data);
    return placeholder;
  } else if (isArray(data)) {
    var newData = new Array(data.length);
    for (var i = 0; i < data.length; i++) {
      newData[i] = _deconstructPacket(data[i], buffers);
    }
    return newData;
  } else if (typeof data === 'object' && !(data instanceof Date)) {
    var newData = {};
    for (var key in data) {
      newData[key] = _deconstructPacket(data[key], buffers);
    }
    return newData;
  }
  return data;
}

/**
 * Reconstructs a binary packet from its placeholder packet and buffers
 *
 * @param {Object} packet - event packet with placeholders
 * @param {Array} buffers - binary buffers to put in placeholder positions
 * @return {Object} reconstructed packet
 * @api public
 */

exports.reconstructPacket = function(packet, buffers) {
  packet.data = _reconstructPacket(packet.data, buffers);
  packet.attachments = undefined; // no longer useful
  return packet;
};

function _reconstructPacket(data, buffers) {
  if (!data) return data;

  if (data && data._placeholder) {
    return buffers[data.num]; // appropriate buffer (should be natural order anyway)
  } else if (isArray(data)) {
    for (var i = 0; i < data.length; i++) {
      data[i] = _reconstructPacket(data[i], buffers);
    }
  } else if (typeof data === 'object') {
    for (var key in data) {
      data[key] = _reconstructPacket(data[key], buffers);
    }
  }

  return data;
}

/**
 * Asynchronously removes Blobs or Files from data via
 * FileReader's readAsArrayBuffer method. Used before encoding
 * data as msgpack. Calls callback with the blobless data.
 *
 * @param {Object} data
 * @param {Function} callback
 * @api private
 */

exports.removeBlobs = function(data, callback) {
  function _removeBlobs(obj, curKey, containingObject) {
    if (!obj) return obj;

    // convert any blob
    if ((withNativeBlob && obj instanceof Blob) ||
        (withNativeFile && obj instanceof File)) {
      pendingBlobs++;

      // async filereader
      var fileReader = new FileReader();
      fileReader.onload = function() { // this.result == arraybuffer
        if (containingObject) {
          containingObject[curKey] = this.result;
        }
        else {
          bloblessData = this.result;
        }

        // if nothing pending its callback time
        if(! --pendingBlobs) {
          callback(bloblessData);
        }
      };

      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
    } else if (isArray(obj)) { // handle array
      for (var i = 0; i < obj.length; i++) {
        _removeBlobs(obj[i], i, obj);
      }
    } else if (typeof obj === 'object' && !isBuf(obj)) { // and object
      for (var key in obj) {
        _removeBlobs(obj[key], key, obj);
      }
    }
  }

  var pendingBlobs = 0;
  var bloblessData = data;
  _removeBlobs(bloblessData);
  if (!pendingBlobs) {
    callback(bloblessData);
  }
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./is-buffer":51,"isarray":38}],50:[function(require,module,exports){

/**
 * Module dependencies.
 */

var debug = require('debug')('socket.io-parser');
var Emitter = require('component-emitter');
var binary = require('./binary');
var isArray = require('isarray');
var isBuf = require('./is-buffer');

/**
 * Protocol version.
 *
 * @api public
 */

exports.protocol = 4;

/**
 * Packet types.
 *
 * @api public
 */

exports.types = [
  'CONNECT',
  'DISCONNECT',
  'EVENT',
  'ACK',
  'ERROR',
  'BINARY_EVENT',
  'BINARY_ACK'
];

/**
 * Packet type `connect`.
 *
 * @api public
 */

exports.CONNECT = 0;

/**
 * Packet type `disconnect`.
 *
 * @api public
 */

exports.DISCONNECT = 1;

/**
 * Packet type `event`.
 *
 * @api public
 */

exports.EVENT = 2;

/**
 * Packet type `ack`.
 *
 * @api public
 */

exports.ACK = 3;

/**
 * Packet type `error`.
 *
 * @api public
 */

exports.ERROR = 4;

/**
 * Packet type 'binary event'
 *
 * @api public
 */

exports.BINARY_EVENT = 5;

/**
 * Packet type `binary ack`. For acks with binary arguments.
 *
 * @api public
 */

exports.BINARY_ACK = 6;

/**
 * Encoder constructor.
 *
 * @api public
 */

exports.Encoder = Encoder;

/**
 * Decoder constructor.
 *
 * @api public
 */

exports.Decoder = Decoder;

/**
 * A socket.io Encoder instance
 *
 * @api public
 */

function Encoder() {}

var ERROR_PACKET = exports.ERROR + '"encode error"';

/**
 * Encode a packet as a single string if non-binary, or as a
 * buffer sequence, depending on packet type.
 *
 * @param {Object} obj - packet object
 * @param {Function} callback - function to handle encodings (likely engine.write)
 * @return Calls callback with Array of encodings
 * @api public
 */

Encoder.prototype.encode = function(obj, callback){
  debug('encoding packet %j', obj);

  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    encodeAsBinary(obj, callback);
  } else {
    var encoding = encodeAsString(obj);
    callback([encoding]);
  }
};

/**
 * Encode packet as string.
 *
 * @param {Object} packet
 * @return {String} encoded
 * @api private
 */

function encodeAsString(obj) {

  // first is type
  var str = '' + obj.type;

  // attachments if we have them
  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
    str += obj.attachments + '-';
  }

  // if we have a namespace other than `/`
  // we append it followed by a comma `,`
  if (obj.nsp && '/' !== obj.nsp) {
    str += obj.nsp + ',';
  }

  // immediately followed by the id
  if (null != obj.id) {
    str += obj.id;
  }

  // json data
  if (null != obj.data) {
    var payload = tryStringify(obj.data);
    if (payload !== false) {
      str += payload;
    } else {
      return ERROR_PACKET;
    }
  }

  debug('encoded %j as %s', obj, str);
  return str;
}

function tryStringify(str) {
  try {
    return JSON.stringify(str);
  } catch(e){
    return false;
  }
}

/**
 * Encode packet as 'buffer sequence' by removing blobs, and
 * deconstructing packet into object with placeholders and
 * a list of buffers.
 *
 * @param {Object} packet
 * @return {Buffer} encoded
 * @api private
 */

function encodeAsBinary(obj, callback) {

  function writeEncoding(bloblessData) {
    var deconstruction = binary.deconstructPacket(bloblessData);
    var pack = encodeAsString(deconstruction.packet);
    var buffers = deconstruction.buffers;

    buffers.unshift(pack); // add packet info to beginning of data list
    callback(buffers); // write all the buffers
  }

  binary.removeBlobs(obj, writeEncoding);
}

/**
 * A socket.io Decoder instance
 *
 * @return {Object} decoder
 * @api public
 */

function Decoder() {
  this.reconstructor = null;
}

/**
 * Mix in `Emitter` with Decoder.
 */

Emitter(Decoder.prototype);

/**
 * Decodes an ecoded packet string into packet JSON.
 *
 * @param {String} obj - encoded packet
 * @return {Object} packet
 * @api public
 */

Decoder.prototype.add = function(obj) {
  var packet;
  if (typeof obj === 'string') {
    packet = decodeString(obj);
    if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) { // binary packet's json
      this.reconstructor = new BinaryReconstructor(packet);

      // no attachments, labeled binary but no binary data to follow
      if (this.reconstructor.reconPack.attachments === 0) {
        this.emit('decoded', packet);
      }
    } else { // non-binary full packet
      this.emit('decoded', packet);
    }
  }
  else if (isBuf(obj) || obj.base64) { // raw binary data
    if (!this.reconstructor) {
      throw new Error('got binary data when not reconstructing a packet');
    } else {
      packet = this.reconstructor.takeBinaryData(obj);
      if (packet) { // received final buffer
        this.reconstructor = null;
        this.emit('decoded', packet);
      }
    }
  }
  else {
    throw new Error('Unknown type: ' + obj);
  }
};

/**
 * Decode a packet String (JSON data)
 *
 * @param {String} str
 * @return {Object} packet
 * @api private
 */

function decodeString(str) {
  var i = 0;
  // look up type
  var p = {
    type: Number(str.charAt(0))
  };

  if (null == exports.types[p.type]) {
    return error('unknown packet type ' + p.type);
  }

  // look up attachments if type binary
  if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
    var buf = '';
    while (str.charAt(++i) !== '-') {
      buf += str.charAt(i);
      if (i == str.length) break;
    }
    if (buf != Number(buf) || str.charAt(i) !== '-') {
      throw new Error('Illegal attachments');
    }
    p.attachments = Number(buf);
  }

  // look up namespace (if any)
  if ('/' === str.charAt(i + 1)) {
    p.nsp = '';
    while (++i) {
      var c = str.charAt(i);
      if (',' === c) break;
      p.nsp += c;
      if (i === str.length) break;
    }
  } else {
    p.nsp = '/';
  }

  // look up id
  var next = str.charAt(i + 1);
  if ('' !== next && Number(next) == next) {
    p.id = '';
    while (++i) {
      var c = str.charAt(i);
      if (null == c || Number(c) != c) {
        --i;
        break;
      }
      p.id += str.charAt(i);
      if (i === str.length) break;
    }
    p.id = Number(p.id);
  }

  // look up json data
  if (str.charAt(++i)) {
    var payload = tryParse(str.substr(i));
    var isPayloadValid = payload !== false && (p.type === exports.ERROR || isArray(payload));
    if (isPayloadValid) {
      p.data = payload;
    } else {
      return error('invalid payload');
    }
  }

  debug('decoded %s as %j', str, p);
  return p;
}

function tryParse(str) {
  try {
    return JSON.parse(str);
  } catch(e){
    return false;
  }
}

/**
 * Deallocates a parser's resources
 *
 * @api public
 */

Decoder.prototype.destroy = function() {
  if (this.reconstructor) {
    this.reconstructor.finishedReconstruction();
  }
};

/**
 * A manager of a binary event's 'buffer sequence'. Should
 * be constructed whenever a packet of type BINARY_EVENT is
 * decoded.
 *
 * @param {Object} packet
 * @return {BinaryReconstructor} initialized reconstructor
 * @api private
 */

function BinaryReconstructor(packet) {
  this.reconPack = packet;
  this.buffers = [];
}

/**
 * Method to be called when binary data received from connection
 * after a BINARY_EVENT packet.
 *
 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
 * @return {null | Object} returns null if more binary data is expected or
 *   a reconstructed packet object if all buffers have been received.
 * @api private
 */

BinaryReconstructor.prototype.takeBinaryData = function(binData) {
  this.buffers.push(binData);
  if (this.buffers.length === this.reconPack.attachments) { // done with buffer list
    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
    this.finishedReconstruction();
    return packet;
  }
  return null;
};

/**
 * Cleans up binary packet reconstruction variables.
 *
 * @api private
 */

BinaryReconstructor.prototype.finishedReconstruction = function() {
  this.reconPack = null;
  this.buffers = [];
};

function error(msg) {
  return {
    type: exports.ERROR,
    data: 'parser error: ' + msg
  };
}

},{"./binary":49,"./is-buffer":51,"component-emitter":17,"debug":19,"isarray":38}],51:[function(require,module,exports){
(function (global){

module.exports = isBuf;

var withNativeBuffer = typeof global.Buffer === 'function' && typeof global.Buffer.isBuffer === 'function';
var withNativeArrayBuffer = typeof global.ArrayBuffer === 'function';

var isView = (function () {
  if (withNativeArrayBuffer && typeof global.ArrayBuffer.isView === 'function') {
    return global.ArrayBuffer.isView;
  } else {
    return function (obj) { return obj.buffer instanceof global.ArrayBuffer; };
  }
})();

/**
 * Returns true if obj is a buffer or an arraybuffer.
 *
 * @api private
 */

function isBuf(obj) {
  return (withNativeBuffer && global.Buffer.isBuffer(obj)) ||
          (withNativeArrayBuffer && (obj instanceof global.ArrayBuffer || isView(obj)));
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],52:[function(require,module,exports){
module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}

},{}],53:[function(require,module,exports){
'use strict';

var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
  , length = 64
  , map = {}
  , seed = 0
  , i = 0
  , prev;

/**
 * Return a string representing the specified number.
 *
 * @param {Number} num The number to convert.
 * @returns {String} The string representation of the number.
 * @api public
 */
function encode(num) {
  var encoded = '';

  do {
    encoded = alphabet[num % length] + encoded;
    num = Math.floor(num / length);
  } while (num > 0);

  return encoded;
}

/**
 * Return the integer value specified by the given string.
 *
 * @param {String} str The string to convert.
 * @returns {Number} The integer value represented by the string.
 * @api public
 */
function decode(str) {
  var decoded = 0;

  for (i = 0; i < str.length; i++) {
    decoded = decoded * length + map[str.charAt(i)];
  }

  return decoded;
}

/**
 * Yeast: A tiny growing id generator.
 *
 * @returns {String} A unique id.
 * @api public
 */
function yeast() {
  var now = encode(+new Date());

  if (now !== prev) return seed = 0, prev = now;
  return now +'.'+ encode(seed++);
}

//
// Map each character to its index.
//
for (; i < length; i++) map[alphabet[i]] = i;

//
// Expose the `yeast`, `encode` and `decode` functions.
//
yeast.encode = encode;
yeast.decode = decode;
module.exports = yeast;

},{}]},{},[5,1,2,3,4,6,7])(7)
});
