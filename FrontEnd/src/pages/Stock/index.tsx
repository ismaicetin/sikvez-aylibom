//stock
import React, { startTransition, useState } from "react";
import { Table, Button, Space, Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { SorterResult } from "antd/es/table/interface";
import * as stockServices from "src/service/stocksServices";
import { TableParams, stockType } from "src/type";
import GenericFormItem from "src/components/GenericFormItem";
import { useSearchParams } from "react-router-dom";
import { usePopupStore } from "src/context/popupContext";
import CreateAndUpdate from "./CreateAndUpdate";

const TableList: React.FC = () => {
	const [, updatePopupStore] = usePopupStore(() => null);

	let [searchParams] = useSearchParams();
	const customerId = searchParams.get("customerId");
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
	const tableData = stockServices.stocksUseQuery(tableParams);
	const remove = stockServices.remove();
	const columns: ColumnsType<stockType> = [
		{
			title: <GenericFormItem name="_id" type="Search" label="Ürün Kodu" placeholder="Kod ara" allowClear />,
			dataIndex: "_id",
		},
		{
			title: <GenericFormItem name="name" type="Search" label="Ürün Adı" placeholder="Adı ara" allowClear />,
			dataIndex: "name",
		},

		{
			title: "Miktar",
			dataIndex: "count",
		},
		{
			title: "Satın Alınan Fiyatı",
			dataIndex: "purchasePrice",
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
								updatePopupStore({
									title: "Güncelle",
									content: <CreateAndUpdate data={row} />,
									show: true,
									callback: () => {
										tableData.refetch();
									},
								});
							}}>
							Güncelle
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
							<b>Stok</b>
						</h2>
					</div>
					<div className="rightContent">
						<button
							onClick={() => {
								updatePopupStore({
									title: "Ekle",
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
						const sorterT: SorterResult<stockType> = sorter as SorterResult<stockType>;
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
