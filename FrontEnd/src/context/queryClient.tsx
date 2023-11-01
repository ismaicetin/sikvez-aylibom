// import axios, { AxiosError } from "axios";
import React from "react";
import {
	MutationCache,
	QueryCache,
	QueryClient,
	QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

// import { notification } from "antd";

const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
	const queryClientMemo = React.useMemo(
		() =>
			new QueryClient({
				mutationCache: new MutationCache({
					onError: (error) => {
						// console.log(error);
						toast.error(
							(error as AxiosError<{ message: string }>).response?.data?.message || (error as AxiosError).message
						);
						// if (!axios.isCancel(error)) notification.error(error );
					},
				}),

				queryCache: new QueryCache({
					// select: (res) => (res as AxiosResponse<ApiResponse>).data?.data, // TODO tekrar incelenecek
					onError: (error) => {
						console.log(error);
						// if (!axios.isCancel(error)) notification.error(error);
					},
				}),
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						keepPreviousData: true,
						// refetchOnMount: false,
						retry: 0,
						staleTime: 0.25 * 1000,
					},
				},
			}),
		[]
	);

	return <ReactQueryClientProvider client={queryClientMemo}>{children}</ReactQueryClientProvider>;
};

export default QueryClientProvider;
