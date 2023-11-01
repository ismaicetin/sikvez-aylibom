//debt
import { ApiResponse, TableParams, debtType, totaldebtQueryType } from "src/type";
import { http } from "./axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PaginationType } from "src/type";

export const debtsUseQuery = ({ query, payload }: TableParams) => {
	return useQuery(
		["/api/debtsList", query, payload],
		() => http.post<PaginationType<debtType>>(`/api/debtsList`, payload, { params: { ...query } }),
		{
			select: (data) => data.data,
		}
	);
};
export const debtWillReceiveDateUseQuery = ({ query, payload }: TableParams) => {
	return useQuery(
		["/api/debtWillReceiveDate", query, payload],
		() => http.post<PaginationType<debtType>>(`/api/debtWillReceiveDate`, payload, { params: { ...query } }),
		{
			select: (data) => data.data,
			refetchInterval: 5000,
		}
	);
};
export const create = () => {
	return useMutation(["/api/debts"], (data: debtType) => http.post<any, ApiResponse<debtType>>(`/api/debts`, data));
};
export const update = () => {
	return useMutation(["/api/debts"], (data: debtType) =>
		http.put<any, ApiResponse<debtType>>(`/api/debts/${data._id}`, data)
	);
};
export const remove = () => {
	return useMutation(["/api/debts"], (data: debtType) =>
		http.delete<any, ApiResponse<debtType>>(`/api/debts/${data._id}`)
	);
};

export const totaldebtQuery = ({ query, payload }: TableParams) => {
	return useQuery(
		["/api/totaldebt", query, payload],
		() => http.post<totaldebtQueryType>(`/api/totaldebt`, payload, { params: { ...query } }),
		{
			select: (data) => data.data,
			refetchInterval: 5000,
		}
	);
};

// export const debtsUseQuery = (query?: Partial<PaginationType>, payload?: Partial<debt>) => {
// 	return useQuery(
// 		["/api/debtsList", query, payload],
// 		() => http.post<ApiResponse<PaginationType<debt>>>(`/api/debtsList`, payload, { params: { ...query } }),
// 		{
// 			select: (data) => data.data,
// 		}
// 	);
// };
