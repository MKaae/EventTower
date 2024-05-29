import { readable, writable } from "svelte/store";

export const BASE_URL = readable("http://localhost:8080/api");

export const user = writable(null);

export const gameTitle = writable(null);

export const eventName = writable(null);

export const eventPage = writable(false);

export const eventId = writable(null);

export const location = writable({});
