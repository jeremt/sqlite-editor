import {browser} from '$app/environment';
import {init, register} from 'svelte-i18n';

const fallbackLocale = 'en';

register('en', () => import('./locales/en.json'));
register('fr', () => import('./locales/fr.json'));

init({
    fallbackLocale,
    initialLocale: browser ? window.navigator.language : fallbackLocale,
});
