//user
import React, { startTransition, useState } from "react";
import { Table, Button, Space, Form } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { SorterResult } from "antd/es/table/interface";
import * as userServices from "src/service/userServices";
import { TableParams, userType } from "src/type";
import { usePopupStore } from "src/context/popupContext";
import CreateAndUpdate from "./CreateAndUpdate";
import GenericFormItem from "src/components/GenericFormItem";

const TableList: React.FC = () => {
	const [, updatePopupStore] = usePopupStore(() => null);
	const [tableParams, setTableParams] = useState<TableParams>({
		query: {
			page: 1,
			limit: 10,
		},
	});

	///SERVİCE
	const tableData = userServices.usersUseQuery(tableParams);
	const remove = userServices.remove();

	const columns: ColumnsType<userType> = [
		{
			title: <GenericFormItem name="tc" type="Search" label="TC" placeholder="TC ara" allowClear />,
			dataIndex: "tc",
			// width: "20%",
		},
		{
			title: <GenericFormItem name="name" type="Search" label="Adı" placeholder="Adı ara" allowClear />,
			dataIndex: "name",
		},
		{
			title: <GenericFormItem name="surname" type="Search" label="Soyadı" placeholder="Soyadı ara" allowClear />,
			dataIndex: "surname",
		},
		{
			title: "Oluşturma Zamanı",
			dataIndex: "createdAt",
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
							<b>Kullanıcılar</b>
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
						const sorterT: SorterResult<userType> = sorter as SorterResult<userType>;
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
