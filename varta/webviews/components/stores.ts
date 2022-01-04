import { writable } from 'svelte/store';

export const page = writable('chat');
export const conversation: any = writable(null);;
export const friendList: any = writable([]);;