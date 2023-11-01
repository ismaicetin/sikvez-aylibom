import axios, { AxiosResponse } from "axios";

export let API_URL = "http://localhost:3001";

function parseBody(response: AxiosResponse) {
	if (!response) {
		return {
			status: 500,
			data: [],
			message: "Sunucuya Erişilemiyor",
			statusText: "Sunucuya Erişilemiyor",
		};
	}
	// 1. Bilgilendirme yanıtları (100-199),
	// 2. Başarı yanıtları (200-299),
	// 3. Yönlendirmeler (300-399),
	// 4. İstemci hataları (400-499) ve,
	// 5. Sunucu hataları (500-599).
	const { data, status } = response;

	// if (responseData.status < 400) {
	// 	responseData["success"] = true;
	// 	responseData["url"] = response.config.url;
	// 	responseData["method"] = response.config.method;
	// 	responseData["data"] = responseData.result;
	// 	return responseData;
	// } else

	if (status === 401) {
		// axios.request(response.config);

		localStorage.removeItem("token");
		localStorage.removeItem("permissionList");
		localStorage.removeItem("userInfo");
		// localStorage.removeItem('refreshToken')
		localStorage.removeItem("expiredTime");
		localStorage.removeItem("saveLayout");
		window.location.href = "/";
		return;
	} else {
		return data;
	}
}

let instance = axios.create({
	baseURL: API_URL,
});

// request header
instance.interceptors.request.use(
	(config) => {
		var token = localStorage.getItem("token");
		if (token) {
			config.headers.Authorization = "Bearer " + token;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// response parse
instance.interceptors.response.use(
	(response) => {
		return parseBody(response);
	},
	(error) => {
		// console.log("interceptors.response", error.response);

		return Promise.reject(error);
		// return parseBody(error.response);
	}
);

// instance.interceptors.response.use(
// 	(res: any) => {
// 		// if (!res) {
// 		// 	return {
// 		// 		status: 500,
// 		// 		data: [],
// 		// 		messages: "Sunucuya Erişilemiyor",
// 		// 	};
// 		// }

// 		const { status, data } = res.data;

// 		// if (status === 204) {
// 		// 	// no content
// 		// 	return true;
// 		// }
// 		if (status === 401) {
// 			// axios.request(response.config);

// 			localStorage.removeItem("token");
// 			localStorage.removeItem("permissionList");
// 			localStorage.removeItem("userInfo");
// 			// localStorage.removeItem('refreshToken')
// 			localStorage.removeItem("expiredTime");
// 			localStorage.removeItem("saveLayout");
// 			window.location.href = "/";
// 		}

// 		return res;
// 	},

// 	(error) => {
// 		console.log("interceptors.response", error.response);
// 		// return parseBody(error.response);
// 	}
// );

export const getbaseURL = () => {
	return instance.defaults.baseURL;
};

export const http = instance;
