import { ApiResponse, TableParams, userType } from "src/type";
import { http } from "./axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PaginationType } from "src/type";

export const usersUseQuery = ({ query, payload }: TableParams) => {
	return useQuery(
		["/api/usersList", query, payload],
		() => http.post<PaginationType<userType>>(`/api/usersList`, payload, { params: { ...query } }),
		{
			select: (data) => data.data,
		}
	);
};

export const create = () => {
	return useMutation(["/api/users"], (data: userType) => http.post<any, ApiResponse<userType>>(`/api/users`, data));
};
export const update = () => {
	return useMutation(["/api/users"], (data: userType) =>
		http.put<any, ApiResponse<userType>>(`/api/users/${data._id}`, data)
	);
};
export const remove = () => {
	return useMutation(["/api/users"], (data: userType) =>
		http.delete<any, ApiResponse<userType>>(`/api/users/${data._id}`)
	);
};

// export const usersUseQuery = (query?: Partial<PaginationType>, payload?: Partial<User>) => {
// 	return useQuery(
// 		["/api/usersList", query, payload],
// 		() => http.post<ApiResponse<PaginationType<User>>>(`/api/usersList`, payload, { params: { ...query } }),
// 		{
// 			select: (data) => data.data,
// 		}
// 	);
// };
