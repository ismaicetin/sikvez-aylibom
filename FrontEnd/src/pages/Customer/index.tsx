//customer
import React, { startTransition, useState, useTransition } from "react";
// import qs from "qs";
import { Table, Button, Space, Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { SorterResult } from "antd/es/table/interface";
import * as customerServices from "src/service/customerServices";
import { TableParams, customerType } from "src/type";
import { usePopupStore } from "src/context/popupContext";
import CreateAndUpdate from "./CreateAndUpdate";
import DebtCreate from "./DebtCreate";
import GenericFormItem from "src/components/GenericFormItem";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

// name: string;
// surname: string;
// createdAt?: Date | undefined;
// telefon: string;
// totalDebt: number;

const TableList: React.FC = () => {
	const navigate = useNavigate();
	let [searchParams, setSearchParams] = useSearchParams();

	let initialValues = {};
	const [, updatePopupStore] = usePopupStore(() => null);
	const [tableParams, setTableParams] = useState<TableParams>({
		query: {
			page: 1,
			limit: 10,
		},
		payload: { ...initialValues },
	});

	///SERVİCE
	const tableData = customerServices.customersUseQuery(tableParams);
	const remove = customerServices.remove();

	const columns: ColumnsType<customerType> = [
		{
			title: (
				<div onClick={(e) => e.stopPropagation()}>
					<GenericFormItem name="telefon" type="Search" label="Telefon" placeholder="Telefon ara" allowClear />
				</div>
			),
			dataIndex: "telefon",
			// width: "20%",
			sorter: true,
		},
		{
			title: (
				<div onClick={(e) => e.stopPropagation()}>
					<GenericFormItem
						name="name"
						type="Search"
						label="Adı"
						placeholder="Adı ara"
						allowClear
						onKeyDown={(e) => e.stopPropagation()}
					/>
				</div>
			),
			dataIndex: "name",
		},
		{
			title: (
				<div onClick={(e) => e.stopPropagation()}>
					<GenericFormItem name="surname" type="Search" label="Soyadı" placeholder="Soyadı ara" allowClear />{" "}
				</div>
			),
			dataIndex: "surname",
		},
		{
			title: "Toplam Alacak",
			dataIndex: "totalDebt",
			sorter: true,
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
		{
			title: "Aksiyon",
			render(value, row) {
				return (
					<Space.Compact block size="small">
						<Button
							type="primary"
							onClick={() => {
								updatePopupStore({
									title: "Güncelle",
									content: <CreateAndUpdate data={row} />,
									show: true,
									callback: () => {
										tableData.refetch();
									},
								});
							}}>
							<EditFilled />
						</Button>
						<Button
							type="primary"
							onClick={() => {
								remove.mutate(row, {
									onSuccess: () => {
										tableData.refetch();
									},
								});
							}}
							danger>
							<DeleteFilled />
						</Button>

						<Button
							title="Alış/Veriş Ekle"
							type="primary"
							onClick={() => {
								updatePopupStore({
									title: "Alış/Veriş Ekle",
									content: <DebtCreate data={row} />,
									show: true,
									callback: () => {
										tableData.refetch();
									},
								});
							}}>
							A/V{" "}
						</Button>

						<Button
							title="Geçmiş"
							type="primary"
							onClick={() => {
								const myParams = { name: row.name, surname: row.surname, customerId: row._id || "" };

								const searchParams = new URLSearchParams(myParams).toString();

								navigate(`/debt?${searchParams}`);
							}}>
							Geçmiş
						</Button>
					</Space.Compact>
				);
			},
			fixed: "right",
			width: "20%",
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
							<b>Müsteriler</b>
						</h2>
					</div>
					<div className="rightContent">
						<button
							onClick={() => {
								updatePopupStore({
									title: "Güncelle",
									content: <CreateAndUpdate />,
									show: true,
									callback: () => {
										tableData.refetch();
									},
								});
							}}>
							Ekle
						</button>
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
					loading={tableData.isFetching || remove.isLoading}
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
