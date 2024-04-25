import {browser} from '$app/environment';

export function isMac() {
    if (browser) {
        return navigator.userAgent.includes('Mac OS');
    }
    return false;
}
