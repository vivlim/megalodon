export var NO_REDIRECT = 'urn:ietf:wg:oauth:2.0:oob';
export var DEFAULT_SCOPE = ['read', 'write', 'follow'];
export var DEFAULT_UA = 'megalodon';
export function isBrowser() {
    if (typeof window !== 'undefined') {
        return true;
    }
    else {
        return false;
    }
}
