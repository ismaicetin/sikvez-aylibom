import React, { createContext, useCallback, useContext, useRef, useSyncExternalStore } from "react";

import { mergeDeep } from "src/service/command";

export default function createFastContext<Store>(initialState: Store) {
	function useStoreData(): {
		get: () => Store;
		set: (value: Partial<Store>) => void;
		update: (value: Partial<Store> | ((state: Store) => Partial<Store>)) => void;
		subscribe: (callback: () => void) => () => void;
	} {
		const store = useRef(initialState);

		const get = useCallback(() => store.current, []);

		const subscribers = useRef(new Set<() => void>());

		const set = useCallback((value: Partial<Store>) => {
			store.current = { ...store.current, ...value };
			subscribers.current.forEach((callback) => callback());
		}, []);

		// const update = useCallback((value: Partial<Store>) => {
		//   store.current = mergeDeep(store.current, value)
		//   subscribers.current.forEach((callback) => callback())
		// }, [])

		const update = useCallback((initialData: Partial<Store> | ((state: Store) => Partial<Store>)) => {
			const value = typeof initialData === "function" ? initialData(store.current) : initialData;
			store.current = mergeDeep(store.current, value);
			subscribers.current.forEach((callback) => callback());
		}, []);

		const subscribe = useCallback((callback: () => void) => {
			subscribers.current.add(callback);
			return () => subscribers.current.delete(callback);
		}, []);

		return {
			get,
			set,
			update,
			subscribe,
		};
	}

	type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

	const StoreContext = createContext<UseStoreDataReturnType | null>(null);

	function Provider({ children }: { children: React.ReactNode }) {
		return <StoreContext.Provider value={useStoreData()}>{children}</StoreContext.Provider>;
	}

	function useStore<SelectorOutput>(
		selector: (store: Store) => SelectorOutput
	): [
		SelectorOutput,
		(value: Partial<Store> | ((state: Store) => Partial<Store>)) => void,
		(value: Partial<Store>) => void
	] {
		const store = useContext(StoreContext);
		if (!store) {
			throw new Error("Store not found");
		}

		const state = useSyncExternalStore(
			store.subscribe,
			() => selector(store.get()),
			() => selector(initialState)
		);

		return [state, store.update, store.set];
	}

	return {
		Provider,
		useStore,
		useContext: () => useContext(StoreContext),
	};
}

//TODO://setstate yapısına uygun calısan bistem örnek kodunu bırakıyorum isteyen baska bir yerde kullansın
// type stateType = { a: number; b: number }
// const state: stateType = { a: 1, b: 2 }
// const fun = (initialData: Partial<stateType> | ((state: stateType) => Partial<stateType>)) => {
//   return typeof initialData === 'function' ? initialData(state) : initialData
// }
// console.log(fun({ a: 5 }))
// console.log(
//   fun((prewState) => {
//     return { ...prewState, a: 3 }
//   }),
// )
