// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
// export default defineConfig({
// 	plugins: [react()],
// 	resolve: {
// 		alias: {
// 			src: "/src",
// 		},
// 	},
// });

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			src: "/src",
		},
	},
});
