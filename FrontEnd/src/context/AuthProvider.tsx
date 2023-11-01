import createFastContext from "src/context/createFastContext";
import { User } from "src/type";
import jwtDecode from "jwt-decode";
var token = localStorage.getItem("token") || "";
var decoded = token && jwtDecode(token);

console.log(decoded);

//Auth
type initialDataType = {
	token: string;
	user: User | unknown;
};

const initialData: initialDataType = {
	token: token,
	user: decoded,
};
const { Provider, useStore } = createFastContext<initialDataType>(initialData);
export { Provider, useStore as useAuthStore };
export default Provider;

// //PopupContext
// import React, { type ComponentType, createContext, useCallback, useContext, useRef, useSyncExternalStore } from "react";

// ///initialState
// const initialState = { show: false, width: 580 };

// type initialStateType = {
// 	show?: boolean;
// 	content?: React.JSX.Element | (() => Promise<{ default: ComponentType<unknown> }>);
// 	title?: React.ReactNode;
// 	callback?: (data?: string) => void;
// 	popupData?: unknown;
// 	modalClassName?: string;
// 	width?: string | number;
// };
// type useStoreReturnDataType = {
// 	get: () => initialStateType;
// 	updateState: (value: Partial<initialStateType>) => void;
// 	subscribe: (callback: () => void) => () => void;
// 	open: (value: Partial<initialStateType>) => void;
// 	close: () => void;
// };
// export const StoreContext = createContext<useStoreReturnDataType | null>(null);
// export const usePopupContext = () => useContext(StoreContext);

// ///PopupContext Provider
// export default function PopupContextProvider({ children }: { children: React.ReactNode }) {
// 	const store = useRef<initialStateType>(initialState);
// 	const subscribers = useRef(new Set<() => void>());

// 	const get = useCallback(() => store.current, []);

// 	const updateState = useCallback((value: Partial<initialStateType>) => {
// 		store.current = { ...store.current, ...value };
// 		subscribers.current.forEach((callback) => callback());
// 	}, []);

// 	const subscribe = useCallback((callback: () => void) => {
// 		subscribers.current.add(callback);
// 		return () => subscribers.current.delete(callback);
// 	}, []);

// 	const open = useCallback((value: Partial<initialStateType>) => {
// 		updateState({ show: true, ...value });
// 	}, []);
// 	const close = useCallback(() => {
// 		store.current = { ...initialState };
// 		subscribers.current.forEach((callback) => callback());
// 	}, []);

// 	return (
// 		<StoreContext.Provider
// 			value={{
// 				get,
// 				open,
// 				subscribe,
// 				updateState,
// 				close,
// 			}}>
// 			{children}
// 		</StoreContext.Provider>
// 	);
// }

// /**
//    **** updatePopupStore  LazyComponent Örnegi****
//     store.updateState=updatePopupStore({ content: <_LoginTestComp password="11" username="11" />, show: true })
//     store.updateState=updatePopupStore({ content: () => import('~/_internal/pages_test/TableDemo'), show: true })
//    **/
// export function useStore<SelectorOutput>(
// 	selector: (store: initialStateType) => SelectorOutput
// ): [SelectorOutput, (value: Partial<initialStateType>) => void] {
// 	const store = useContext(StoreContext);
// 	if (!store) {
// 		throw new Error("Store not found");
// 	}

// 	const state = useSyncExternalStore(
// 		store.subscribe,
// 		() => selector(store.get()),
// 		() => selector(initialState)
// 	);

// 	return [state, store.updateState];
// }

// export function getPopupData<SelectorOutput>(): SelectorOutput {
// 	const [state] = useStore((store) => store.popupData);
// 	return state as SelectorOutput;
// }

// ///TODO: popup modalında işlem yaparken enkaranı kapatamaması için bir property eklenec.popupcancelDisabled bu turu ise modalı kapatamayacak
