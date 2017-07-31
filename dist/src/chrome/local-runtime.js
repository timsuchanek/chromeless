"use strict";
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var AWS = require("aws-sdk");
var cuid = require("cuid");
var fs = require("fs");
var util_1 = require("../util");
var LocalRuntime = (function () {
    function LocalRuntime(client, chromlessOptions) {
        this.client = client;
        this.chromlessOptions = chromlessOptions;
    }
    LocalRuntime.prototype.run = function (command) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log('running command', JSON.stringify(command));
                switch (command.type) {
                    case 'goto':
                        return [2 /*return*/, this.goto(command.url)];
                    case 'wait': {
                        if (command.timeout) {
                            return [2 /*return*/, this.waitTimeout(command.timeout)];
                        }
                        else if (command.selector) {
                            return [2 /*return*/, this.waitSelector(command.selector)];
                        }
                        else {
                            throw new Error('waitFn not yet implemented');
                        }
                    }
                    case 'click':
                        return [2 /*return*/, this.click(command.selector)];
                    case 'returnCode':
                        return [2 /*return*/, this.returnCode.apply(this, [command.fn].concat(command.args))];
                    case 'returnExists':
                        return [2 /*return*/, this.returnExists(command.selector)];
                    case 'returnScreenshot':
                        return [2 /*return*/, this.returnScreenshot()];
                    case 'returnInputValue':
                        return [2 /*return*/, this.returnInputValue(command.selector)];
                    case 'type':
                        return [2 /*return*/, this.type(command.input, command.selector)];
                    case 'press':
                        return [2 /*return*/, this.press(command.keyCode, command.count, command.modifiers)];
                    case 'scrollTo':
                        return [2 /*return*/, this.scrollTo(command.x, command.y)];
                    case 'cookiesClearAll':
                        return [2 /*return*/, this.cookiesClearAll()];
                    case 'cookiesGet':
                        return [2 /*return*/, this.cookiesGet(command.nameOrQuery)];
                    case 'cookiesGetAll':
                        return [2 /*return*/, this.cookiesGetAll()];
                    case 'cookiesSet':
                        return [2 /*return*/, this.cookiesSet(command.nameOrCookies, command.value)];
                    default:
                        throw new Error("No such command: " + JSON.stringify(command));
                }
                return [2 /*return*/];
            });
        });
    };
    LocalRuntime.prototype.goto = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, Network, Page;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.client, Network = _a.Network, Page = _a.Page;
                        return [4 /*yield*/, Promise.all([Network.enable(), Page.enable()])];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, Network.setUserAgentOverride({ userAgent: "Chromeless " + util_1.version })];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, Page.navigate({ url: url })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, Page.loadEventFired()];
                    case 4:
                        _b.sent();
                        this.log("Navigated to " + url);
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalRuntime.prototype.waitTimeout = function (timeout) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log("Waiting for " + timeout + "ms");
                        return [4 /*yield*/, util_1.wait(timeout)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalRuntime.prototype.waitSelector = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log("Waiting for " + selector);
                        return [4 /*yield*/, util_1.waitForNode(this.client, selector, this.chromlessOptions.waitTimeout)];
                    case 1:
                        _a.sent();
                        this.log("Waited for " + selector);
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalRuntime.prototype.click = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            var exists, scale;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.chromlessOptions.implicitWait) return [3 /*break*/, 2];
                        this.log("click(): Waiting for " + selector);
                        return [4 /*yield*/, util_1.waitForNode(this.client, selector, this.chromlessOptions.waitTimeout)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, util_1.nodeExists(this.client, selector)];
                    case 3:
                        exists = _a.sent();
                        if (!exists) {
                            throw new Error("click(): node for selector " + selector + " doesn't exist");
                        }
                        scale = this.chromlessOptions.viewport.scale;
                        return [4 /*yield*/, util_1.click(this.client, selector, scale)];
                    case 4:
                        _a.sent();
                        this.log("Clicked on " + selector);
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalRuntime.prototype.returnCode = function (fn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, util_1.evaluate.apply(void 0, [this.client, fn].concat(args))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LocalRuntime.prototype.scrollTo = function (x, y) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, util_1.scrollTo(this.client, x, y)];
            });
        });
    };
    LocalRuntime.prototype.type = function (text, selector) {
        return __awaiter(this, void 0, void 0, function () {
            var exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!selector) return [3 /*break*/, 4];
                        if (!this.chromlessOptions.implicitWait) return [3 /*break*/, 2];
                        this.log("type(): Waiting for " + selector);
                        return [4 /*yield*/, util_1.waitForNode(this.client, selector, this.chromlessOptions.waitTimeout)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, util_1.nodeExists(this.client, selector)];
                    case 3:
                        exists = _a.sent();
                        if (!exists) {
                            throw new Error("type(): Node not found for selector: " + selector);
                        }
                        _a.label = 4;
                    case 4: return [4 /*yield*/, util_1.type(this.client, text, selector)];
                    case 5:
                        _a.sent();
                        this.log("Typed " + text + " in " + selector);
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalRuntime.prototype.cookiesGet = function (nameOrQuery) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, util_1.getCookies(this.client, nameOrQuery)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LocalRuntime.prototype.cookiesGetAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, util_1.getAllCookies(this.client)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LocalRuntime.prototype.cookiesSet = function (nameOrCookies, value) {
        return __awaiter(this, void 0, void 0, function () {
            var cookies, fn, url, cookie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof nameOrCookies !== 'string' && !value)) return [3 /*break*/, 2];
                        cookies = Array.isArray(nameOrCookies) ? nameOrCookies : [nameOrCookies];
                        return [4 /*yield*/, util_1.setCookies(this.client, cookies)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        if (!(typeof nameOrCookies === 'string' && typeof value === 'string')) return [3 /*break*/, 5];
                        fn = function () { return location.href; };
                        return [4 /*yield*/, util_1.evaluate(this.client, "" + fn)];
                    case 3:
                        url = _a.sent();
                        cookie = {
                            url: url,
                            name: nameOrCookies,
                            value: value,
                        };
                        return [4 /*yield*/, util_1.setCookies(this.client, [cookie])];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: throw new Error("cookiesSet(): Invalid input " + nameOrCookies + ", " + value);
                }
            });
        });
    };
    LocalRuntime.prototype.cookiesClearAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, util_1.clearCookies(this.client)];
                    case 1:
                        _a.sent();
                        this.log('Cookies cleared');
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalRuntime.prototype.press = function (keyCode, count, modifiers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log("Sending keyCode " + keyCode + " (modifiers: " + modifiers + ")");
                        return [4 /*yield*/, util_1.press(this.client, keyCode, count, this.chromlessOptions.viewport.scale, modifiers)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LocalRuntime.prototype.returnExists = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, util_1.nodeExists(this.client, selector)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LocalRuntime.prototype.returnInputValue = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            var exists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, util_1.nodeExists(this.client, selector)];
                    case 1:
                        exists = _a.sent();
                        if (!exists) {
                            throw new Error("value: node for selector " + selector + " doesn't exist");
                        }
                        return [2 /*return*/, util_1.getValue(this.client, selector)];
                }
            });
        });
    };
    // Returns the S3 url or local file path
    LocalRuntime.prototype.returnScreenshot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, s3Path, s3, filePath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, util_1.screenshot(this.client)
                        // check if S3 configured
                    ];
                    case 1:
                        data = _a.sent();
                        if (!(process.env['CHROMELESS_S3_BUCKET_NAME'] && process.env['CHROMELESS_S3_BUCKET_URL'])) return [3 /*break*/, 3];
                        s3Path = cuid() + ".png";
                        s3 = new AWS.S3();
                        return [4 /*yield*/, s3.putObject({
                                Bucket: process.env['CHROMELESS_S3_BUCKET_NAME'],
                                Key: s3Path,
                                ContentType: 'image/png',
                                ACL: 'public-read',
                                Body: new Buffer(data, 'base64'),
                            }).promise()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, "https://" + process.env['CHROMELESS_S3_BUCKET_URL'] + "/" + s3Path];
                    case 3:
                        filePath = "/tmp/" + cuid() + ".png";
                        fs.writeFileSync(filePath, Buffer.from(data, 'base64'));
                        return [2 /*return*/, filePath];
                }
            });
        });
    };
    LocalRuntime.prototype.log = function (msg) {
        if (this.chromlessOptions.debug) {
            console.log(msg);
        }
    };
    return LocalRuntime;
}());
exports.default = LocalRuntime;
//# sourceMappingURL=local-runtime.js.map