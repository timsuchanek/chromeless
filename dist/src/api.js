"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var local_1 = require("./chrome/local");
var remote_1 = require("./chrome/remote");
var queue_1 = require("./queue");
var util_1 = require("./util");
var Chromeless = (function () {
    function Chromeless(options, copyInstance) {
        if (options === void 0) { options = {}; }
        if (copyInstance) {
            this.queue = copyInstance.queue;
            this.lastReturnPromise = copyInstance.lastReturnPromise;
            return;
        }
        var mergedOptions = __assign({ debug: util_1.getDebugOption(), waitTimeout: 10000, remote: false, implicitWait: true }, options, { viewport: __assign({ scale: 1 }, options.viewport), cdp: __assign({ host: 'localhost', port: 9222, secure: false, closeTab: true }, options.cdp) });
        var chrome = mergedOptions.remote
            ? new remote_1.default(mergedOptions)
            : new local_1.default(mergedOptions);
        this.queue = new queue_1.default(chrome);
        this.lastReturnPromise = Promise.resolve(undefined);
    }
    Chromeless.prototype.then = function (onFulfill, onReject) {
        return this.lastReturnPromise.then(onFulfill, onReject);
    };
    Chromeless.prototype.catch = function (onrejected) {
        return this.lastReturnPromise.catch(onrejected);
    };
    Chromeless.prototype.goto = function (url) {
        this.queue.enqueue({ type: 'goto', url: url });
        return this;
    };
    Chromeless.prototype.click = function (selector) {
        this.queue.enqueue({ type: 'click', selector: selector });
        return this;
    };
    Chromeless.prototype.wait = function (firstArg) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        switch (typeof firstArg) {
            case 'number': {
                this.queue.enqueue({ type: 'wait', timeout: firstArg });
                break;
            }
            case 'string': {
                this.queue.enqueue({ type: 'wait', selector: firstArg });
                break;
            }
            case 'function': {
                this.queue.enqueue({ type: 'wait', fn: firstArg, args: args });
                break;
            }
            default:
                throw new Error("Invalid wait arguments: " + firstArg + " " + args);
        }
        return this;
    };
    Chromeless.prototype.focus = function (selector) {
        throw new Error('Not implemented yet');
    };
    Chromeless.prototype.press = function (keyCode, count, modifiers) {
        this.queue.enqueue({ type: 'press', keyCode: keyCode, count: count, modifiers: modifiers });
        return this;
    };
    Chromeless.prototype.type = function (input, selector) {
        this.queue.enqueue({ type: 'type', input: input, selector: selector });
        return this;
    };
    Chromeless.prototype.back = function () {
        throw new Error('Not implemented yet');
    };
    Chromeless.prototype.forward = function () {
        throw new Error('Not implemented yet');
    };
    Chromeless.prototype.refresh = function () {
        throw new Error('Not implemented yet');
    };
    Chromeless.prototype.mousedown = function () {
        throw new Error('Not implemented yet');
    };
    Chromeless.prototype.mouseup = function () {
        throw new Error('Not implemented yet');
    };
    Chromeless.prototype.mouseover = function () {
        throw new Error('Not implemented yet');
    };
    Chromeless.prototype.scrollTo = function (x, y) {
        this.queue.enqueue({ type: 'scrollTo', x: x, y: y });
        return this;
    };
    Chromeless.prototype.viewport = function (width, height) {
        throw new Error('Not implemented yet');
    };
    Chromeless.prototype.evaluate = function (fn) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log('puting evaluate to queue', arguments);
        this.lastReturnPromise = this.queue.process({ type: 'returnCode', fn: fn.toString(), args: args });
        return new Chromeless({}, this);
        // return this
    };
    Chromeless.prototype.inputValue = function (selector) {
        this.lastReturnPromise = this.queue.process({ type: 'returnInputValue', selector: selector });
        return new Chromeless({}, this);
    };
    Chromeless.prototype.exists = function (selector) {
        this.lastReturnPromise = this.queue.process({ type: 'returnExists', selector: selector });
        return new Chromeless({}, this);
    };
    Chromeless.prototype.screenshot = function () {
        console.log('putting screenshot to queue');
        this.lastReturnPromise = this.queue.process({ type: 'returnScreenshot' });
        return new Chromeless({}, this);
    };
    Chromeless.prototype.cookiesGet = function (nameOrQuery) {
        if (typeof nameOrQuery !== 'undefined') {
            throw new Error('Querying cookies is not implemented yet');
        }
        this.lastReturnPromise = this.queue.process({ type: 'cookiesGet', nameOrQuery: nameOrQuery });
        return new Chromeless({}, this);
    };
    Chromeless.prototype.cookiesGetAll = function () {
        this.lastReturnPromise = this.queue.process({ type: 'cookiesGetAll' });
        return new Chromeless({}, this);
    };
    Chromeless.prototype.cookiesSet = function (nameOrCookies, value) {
        this.queue.enqueue({ type: 'cookiesSet', nameOrCookies: nameOrCookies, value: value });
        return this;
    };
    Chromeless.prototype.cookiesClear = function (name) {
        throw new Error('Not implemented yet');
    };
    Chromeless.prototype.cookiesClearAll = function () {
        this.queue.enqueue({ type: 'cookiesClearAll' });
        return this;
    };
    Chromeless.prototype.end = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.lastReturnPromise];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, this.queue.end()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return Chromeless;
}());
exports.default = Chromeless;
//# sourceMappingURL=api.js.map