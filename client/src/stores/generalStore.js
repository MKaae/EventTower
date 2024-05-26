import { readable, writable } from "svelte/store";

export const user = writable(null);
export const eventPage = writable(false);
export const eventStore = writable({
  id: "",
});


export const location = writable({});