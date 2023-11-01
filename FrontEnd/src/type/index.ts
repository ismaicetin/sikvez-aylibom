import { TablePaginationConfig } from "antd";
import { FilterValue } from "antd/es/table/interface";

export type ApiResponse<T = unknown> = {
	status: number;
	data: T;
	messages: string;
};

export type PaginationType<T = unknown> = {
	docs: T[];
	hasNextPage: boolean;
	hasPrevPage: boolean;
	limit: number;
	nextPage: number | null;
	page: number;
	pagingCounter: number;
	prevPage: number | null;
	totalDocs: number;
	totalPages: number;
};

export type userType = {
	_id?: string;
	tc: string;
	name: string;
	surname: string;
	active?: boolean;
	password: string;
	createdAt?: Date;
	updateAt?: Date;
};
export type loginType = {
	username: string;
	password: string;
};
export type loginResponseType = {
	active: boolean;
	createdAt: Date;
	updateAt: Date;
	_id: string;
	name: string;
	mail: string;
	telefon: string;
	firma: string;
	token: string;
};

// export interface TableParams {
// 	pagination?: TablePaginationConfig;
// 	sortField?: string;
// 	sortOrder?: string;
// 	filters?: Record<string, FilterValue | null>;
// }

export interface TableParams {
	payload?: Record<string, any>;
	query?: {
		select?: object | string | undefined;
		sort?: object | string | undefined;
		projection?: any;
		lean?: boolean | undefined;
		leanWithId?: boolean | undefined;
		offset?: number | undefined;
		page?: number | undefined;
		limit?: number | undefined;
		pagination?: boolean | undefined;
	};
}

export type customerType = {
	_id?: string;
	name: string;
	surname: string;
	createdAt?: Date;
	updateAt?: Date;
	telefon: string;
	totalDebt: number;
};

export type stockType = {
	_id?: string;
	name: string;
	count: number;
	createdAt?: Date;
	updateAt?: Date;
};

export type debtType = {
	_id?: string;
	customer: string;
	createdAt?: Date;
	updateAt?: Date;
	debtWillReceiveDate?: Date | string;
	amount: number;
};

export type totaldebtQueryType = {
	buy: Number;
	sell: Number;
	totalAmount: Number;
};
