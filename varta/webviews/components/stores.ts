import { writable } from 'svelte/store';

export const page = writable('home');
export const conversation: any = writable(null);
export const friendList: any = writable([]);
export const friend: any = writable([]);
