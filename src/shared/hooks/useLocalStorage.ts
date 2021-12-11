import { useEffect, useState } from "react";
import localforage from "localforage";

export type StateValue<T> = T | (() => T);
export type Result<T> = [T, (value: T) => void, boolean, boolean];
export type UseLocalStorage = <T>(key: string, initialState: StateValue<T>, deleteOn?: StateValue<T>) => Result<T>;

export let store = localforage.createInstance({
    name: "values"
});

/**
 * Returns a hook for LocalStorage values
 *
 * @param prefix A prefix
 */
export function createUseLocalStorage(prefix: string): UseLocalStorage {
    return <T>(key: string, initialState: T | (() => T), deleteOn: T | (() => T) = initialState) =>
        useStateWithLocalStorage(key, initialState, deleteOn);
}

/**
 * Use state value from LocalStorage
 * @param key A key prefix
 * @param initialState initial state
 * @param deleteOn A value that handle deleting local storage key
 */
export function useStateWithLocalStorage<T>(
    key: string,
    initialState: StateValue<T>,
    deleteOn: StateValue<T> = initialState
): Result<T> {
    let [value, setValue] = useState<T>(initialState);
    let [loading, setLoading] = useState(false);
    let [saving, setSaving] = useState(false);

    useEffect(() => {
        setLoading(true);
        store.getItem<T>(key).then((val) => {
            if (val) {
                setValue(val);
            }
            setLoading(false);
        });
    }, [key]);

    return [
        value,
        async (val: T) => {
            setSaving(true);
            if (val === deleteOn) {
                await store.removeItem(key);
            } else {
                // TODO найти способ использовать debounce
                await store.setItem(key, val);
            }
            setSaving(false);
            setValue(val);
        },
        loading,
        saving
    ];
}
