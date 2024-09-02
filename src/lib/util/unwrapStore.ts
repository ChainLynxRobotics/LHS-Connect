import type { Writable } from "svelte/store";

export default function unwrapStore<V, K extends keyof V>(store: Writable<V>, key: K): Writable<V[K]> {

    let value: V[K];

    return {
        subscribe: (run) => {
            return store.subscribe((state) => {
                value = state[key];
                run(value);
            });
        },
        set(value: V[K]) {
            store.update((state) => {
                return {
                    ...state,
                    [key]: value,
                };
            });
        },
        update(updater) {
            store.update((state) => {
                return {
                    ...state,
                    [key]: updater(state[key]),
                };
            });
        },
    }
}