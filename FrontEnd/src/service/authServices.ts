import { ApiResponse, User, loginResponseType, loginType } from "src/type";
import { http } from "./axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useFetchUser = () => {
	return useQuery(["/api/login"], () => http.get<ApiResponse<User>>(`/users`));
};
export const login = () => {
	return useMutation(["/api/login"], (data: loginType) =>
		http.post<any, ApiResponse<loginResponseType>>(`/api/login`, data)
	);
};
export const logout = () => {
	localStorage.removeItem("token");
	window.location.href = "/";
};
// post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;

// http.post("sdssds")
//  let i = useFetchUser();

// export let deleteActiveAlarm = async (data) => {
// 	return http.delete(`/monitor-service/Alarm/DeleteActiveAlarm/${data}`);
// };
// export let getAlarmCount = async () => {
// 	return http.get(`/monitor-mw-service/Alarm/GetActiveAlarmCountBySeverity`);
// };
// export let getAlarmLog = async (params) => {
// 	let res = await http.get(`/monitor-service/HistoricalAlarm/GetHistoricalAlarmsByPage`, { params: params });
// 	//TODO:yapılacak kod
// 	// res.data.totalDataCount = res.data.pageSize * res.data.rowSize
// 	return res;
// };

// export let getSpecialSearchFieldList = async (params) => {
// 	// return await http.get(`/monitor-service/MLParameterLog/getMLParameterLogsOfLastYearByPage`, { params: params })
// 	return {
// 		status: 200,
// 		success: true,
// 		data: { TestStation: "TestStation", TestStation1: "TestStation1", TestStation2: "TestStation2" },
// 		message: "sdsd",
// 	};
// };
