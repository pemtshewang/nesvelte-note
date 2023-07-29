import { writable } from "svelte/store";

const { subscribe, update, set } = writable(false);

function createState() {
  return {
    subscribe,
    toggle: () => update((bool) => !bool),
  }
}

export const created = createState();
