//stock
import { ApiResponse, TableParams, stockType } from "src/type";
import { http } from "./axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PaginationType } from "src/type";

export const stocksUseQuery = ({ query, payload }: TableParams) => {
	return useQuery(
		["/api/stocksList", query, payload],
		() => http.post<PaginationType<stockType>>(`/api/stocksList`, payload, { params: { ...query } }),
		{
			select: (data) => data.data,
		}
	);
};

export const create = () => {
	return useMutation(["/api/stocks"], (data: stockType) =>
		http.post<any, ApiResponse<stockType>>(`/api/stocks`, data)
	);
};
export const update = () => {
	return useMutation(["/api/stocks"], (data: stockType) =>
		http.put<any, ApiResponse<stockType>>(`/api/stocks/${data._id}`, data)
	);
};
export const remove = () => {
	return useMutation(["/api/stocks"], (data: stockType) =>
		http.delete<any, ApiResponse<stockType>>(`/api/stocks/${data._id}`)
	);
};
