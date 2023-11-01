import AuthProvider from "src/context/AuthProvider";
import PopupProvider from "src/context/popupContext";
import Root from "src/Root";

import CustomQueryClientProvider from "src/context/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
export default function App() {
	return (
		<CustomQueryClientProvider>
			<PopupProvider>
				<AuthProvider>
					<Root />
				</AuthProvider>
				<ReactQueryDevtools />
				<ToastContainer />
			</PopupProvider>
		</CustomQueryClientProvider>
	);
}
