import { derived, get, writable } from "svelte/store";

export function createHistoryManager<A>(initialState: A) {

    const history = writable<{
        stack: A[];
        cursor: number;
    }>({
        stack: [initialState],
        cursor: 0
    });

    function push(state: A) {
        history.update(({stack, cursor}) => {
            if (cursor != stack.length) stack.splice(cursor + 1);
            stack.push(state);
            cursor++;
            return {stack, cursor}
        });
    }

    function set(state: A) {
        history.update(({stack, cursor}) => {
            if (cursor != stack.length) stack.splice(cursor + 1);
            stack[cursor] = state;
            return {stack, cursor}
        });
    }

    function undo() {
        history.update(({stack, cursor}) => {
            if (!(cursor > 0)) return {stack, cursor}; // Change nothing

            cursor--;

            return {stack, cursor}
        });
    }

    function redo() {
        history.update(({stack, cursor})=>{
            if (!(cursor < stack.length - 1)) return {stack, cursor}; // Change nothing

            cursor++;

            return {stack, cursor}
        });
    }

    function clearHistory() {
        history.update(({stack, cursor}) => {
            return {
                stack: [stack[cursor]],
                cursor: 0
            }
        });
    }

    const currentState = derived(history, ($history) => $history.stack[$history.cursor]);
    const canUndo = derived(history, ($history) => $history.cursor > 0)
    const canRedo = derived(history, ($history) => $history.cursor < $history.stack.length - 1)

    return {
        state: {
            subscribe: currentState.subscribe,
            set: push, // NOTE: this uses a custom function to push to the history to emulate using set on the state
        },
        canUndo,
        canRedo,
        /**
         * Adds a new value to the history stack, deleting any "future" elements and setting the current state to this one.
         * 
         * @param state - This new value for the state
         */
        push,
        /**
         * Sets the current state to a new state without adding it to a stack, aka this change cannot be undone.
         * 
         * Note: This still deletes any "future" elements aka redo-es.
         * @param state 
         */
        set,
        /**
         * Undoes a push, setting the current state to the state one less in the stack.
         * 
         * If an undo isn't possible, nothing will change.
         */
        undo,
        /**
         * Undoes a undo, returning to what was written before and setting the current state to one forward on the stack.
         * 
         * If a redo isn't possible, nothing will change.
         */
        redo,
        /**
         * Sets the current state to the only known state, creating a new stack with it being the only item in it
         */
        clearHistory
    }
}