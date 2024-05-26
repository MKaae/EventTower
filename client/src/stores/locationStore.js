import { writable } from 'svelte/store';

const createLocationStore = () => {
  const { subscribe, set } = writable({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash
  });

  return {
    subscribe,
    update: () => set({
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash
    })
  };
};

export const locationStore = createLocationStore();