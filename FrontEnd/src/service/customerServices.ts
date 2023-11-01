import { ApiResponse, customerType, TableParams } from "src/type";
import { http } from "./axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PaginationType } from "src/type";

export const customersUseQuery = ({ query, payload }: TableParams) => {
	return useQuery(
		["/api/customersList", query, payload],
		() => http.post<PaginationType<customerType>>(`/api/customersList`, payload, { params: { ...query } }),
		{
			select: (data) => data.data,
		}
	);
};
export const fourMonthsNonPaymentListUseQuery = ({ query, payload }: TableParams) => {
	return useQuery(
		["/api/fourMonthsNonPaymentList", query, payload],
		() => http.post<PaginationType<customerType>>(`/api/fourMonthsNonPaymentList`, payload, { params: { ...query } }),
		{
			select: (data) => data.data,
		}
	);
};

export const create = () => {
	return useMutation(["/api/customers"], (data: customerType) =>
		http.post<any, ApiResponse<customerType>>(`/api/customers`, data)
	);
};
export const update = () => {
	return useMutation(["/api/customers"], (data: customerType) =>
		http.put<any, ApiResponse<customerType>>(`/api/customers/${data._id}`, data)
	);
};
export const remove = () => {
	return useMutation(["/api/customers"], (data: customerType) =>
		http.delete<any, ApiResponse<customerType>>(`/api/customers/${data._id}`)
	);
};

// export const customersUseQuery = (query?: Partial<PaginationType>, payload?: Partial<Customer>) => {
// 	return useQuery(
// 		["/api/customersList", query, payload],
// 		() => http.post<ApiResponse<PaginationType<Customer>>>(`/api/customersList`, payload, { params: { ...query } }),
// 		{
// 			select: (data) => data.data,
// 		}
// 	);
// };
