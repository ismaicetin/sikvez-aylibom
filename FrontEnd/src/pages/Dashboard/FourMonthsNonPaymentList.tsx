//customer
import React, { startTransition, useState } from "react";

import { Table, Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { SorterResult } from "antd/es/table/interface";
import * as customerServices from "src/service/customerServices";
import { TableParams, customerType } from "src/type";
import { usePopupStore } from "src/context/popupContext";
import GenericFormItem from "src/components/GenericFormItem";
import { useNavigate } from "react-router-dom";

const TableList: React.FC = () => {
	let initialValues = {};
	const [tableParams, setTableParams] = useState<TableParams>({
		query: {
			page: 1,
			limit: 10,
		},
		payload: { ...initialValues },
	});

	///SERVİCE
	const tableData = customerServices.fourMonthsNonPaymentListUseQuery(tableParams);

	const columns: ColumnsType<customerType> = [
		{
			title: "Telefon",
			dataIndex: "telefon",
			// width: "20%",
			sorter: true,
		},
		{
			title: "Adı",
			dataIndex: "name",
		},
		{
			title: "Soyadı",
			dataIndex: "surname",
		},
		{
			title: "Toplam alacak",
			dataIndex: "totalDebt",
		},
		{
			title: "Son Ödenen Tarih",
			dataIndex: "lastDebtPayDate",
			render: (value) => {
				// return value;
				const event = new Date(value);
				return event.toLocaleString("tr-TR");
			},
			sorter: true,
		},
		{
			title: "Oluşturma Zamanı",
			dataIndex: "createdAt",
			render: (value) => {
				// return value;
				const event = new Date(value);
				return event.toLocaleString("tr-TR");
			},
			sorter: true,
		},
	];
	return (
		<div>
			<Form
				name="global_state"
				layout="vertical"
				autoComplete="off"
				initialValues={initialValues}
				onValuesChange={(_, allFields) => {
					startTransition(() => {
						setTableParams((prew) => ({
							...prew,
							payload: {
								...allFields,
							},
						}));
					});
				}}>
				<div className="tableHeaderContainer">
					<div className="title">
						<h2>
							<b>4 ay ödeme Yapmayan Müsteriler</b>
						</h2>
					</div>
				</div>
				<Table
					size="small"
					columns={columns}
					rowKey="_id"
					dataSource={tableData.data?.docs || []}
					pagination={{
						total: tableData.data?.totalDocs,
						// ...tableParams.pagination,
					}}
					loading={tableData.isFetching}
					onChange={(pagination, filters, sorter) => {
						console.log(sorter);
						const sorterT: SorterResult<customerType> = sorter as SorterResult<customerType>;
						let sort = "";
						if (sorterT?.field && sorterT.order != undefined) {
							sort = (sorterT.order == "descend" ? "-" : "") + sorterT.field;
						}
						setTableParams((prew) => ({
							...prew,
							query: {
								...prew.query,
								page: pagination.current,
								limit: pagination.pageSize,
								sort: sort,
							},
						}));
					}}
					scroll={{ x: 1200 }}
				/>
			</Form>
		</div>
	);
};

export default TableList;
