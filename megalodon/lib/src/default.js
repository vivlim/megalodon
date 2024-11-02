"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBrowser = exports.DEFAULT_UA = exports.DEFAULT_SCOPE = exports.NO_REDIRECT = void 0;
exports.NO_REDIRECT = 'urn:ietf:wg:oauth:2.0:oob';
exports.DEFAULT_SCOPE = ['read', 'write', 'follow'];
exports.DEFAULT_UA = 'megalodon';
function isBrowser() {
    if (typeof window !== 'undefined') {
        return true;
    }
    else {
        return false;
    }
}
exports.isBrowser = isBrowser;
