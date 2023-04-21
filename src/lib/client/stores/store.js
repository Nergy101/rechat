import { browser } from '$app/environment';
import { writable } from 'svelte/store';

let stored = browser && localStorage.username;

export const username = writable(stored || '');

if (browser) {
	username.subscribe((u) => (localStorage.username = u));
}
