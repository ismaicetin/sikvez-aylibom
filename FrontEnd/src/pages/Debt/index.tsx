//debt
import { startTransition, useState } from "react";
import { Table, Button, Space, Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { SorterResult } from "antd/es/table/interface";
import * as debtServices from "src/service/debtServices";
import { TableParams, debtType } from "src/type";
import GenericFormItem from "src/components/GenericFormItem";
import Statistic from "src/pages/Debt/Statistic";
import { useSearchParams } from "react-router-dom";

const TableList = () => {
	let [searchParams] = useSearchParams();
	const customerId = searchParams.get("customerId");
	const name = searchParams.get("name");
	const surname = searchParams.get("surname");
	let initialValues = {};
	if (customerId) initialValues = { _id: customerId };
	const [tableParams, setTableParams] = useState<TableParams>({
		query: {
			page: 1,
			limit: 10,
		},
		payload: { ...initialValues },
	});

	///SERVİCE
	const tableData = debtServices.debtsUseQuery(tableParams);
	const remove = debtServices.remove();
	const columns: ColumnsType<debtType> = [
		{
			title: <GenericFormItem name={"telefon"} type="Search" label="Telefon" placeholder="Telefon ara" allowClear />,
			dataIndex: ["customer", "telefon"],
			// width: "20%",
		},
		{
			title: <GenericFormItem name="name" type="Search" label="Adı" placeholder="Adı ara" allowClear />,
			dataIndex: ["customer", "name"],
		},
		{
			title: <GenericFormItem name="surname" type="Search" label="Soyadı" placeholder="Soyadı ara" allowClear />,
			dataIndex: ["customer", "surname"],
		},
		{
			title: "Satılan/Alınan",
			dataIndex: "amount",
			render(value, record, index) {
				return `${value} TL`;
			},
		},
		{
			title: "ürün adı",
			dataIndex: ["stockCode", "name"],
		},

		{
			title: "Açıklama",
			dataIndex: "description",
		},
		{
			title: "Oluşturma Zamanı",
			dataIndex: "createdAt",
			sorter: true,
			// width: "20%",
			render: (value) => {
				// return value;
				const event = new Date(value);
				return event.toLocaleString("tr-TR");
			},
		},

		{
			title: "Aksiyon",
			render(value, row) {
				return (
					<Space wrap>
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
							Sil
						</Button>
					</Space>
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
							<b>Alışveriş</b> {(name || surname) && <span>{`( ${name} ${surname} )`}</span>}
						</h2>
					</div>
				</div>
				<Statistic customerId={customerId} />

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
						const sorterT: SorterResult<debtType> = sorter as SorterResult<debtType>;
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
					rowClassName={(record, index) => (record?.amount < 0 ? "table-row-red" : "")}
				/>
			</Form>
		</div>
	);
};

export default TableList;
