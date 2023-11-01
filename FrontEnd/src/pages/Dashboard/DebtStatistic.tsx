import React, { useState } from "react";
// import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Popover, Row, Statistic } from "antd";
import * as debtServices from "src/service/debtServices";
import { TableParams } from "src/type";
import { daysInMonth } from "src/service/command";

type StatisticPageType = {
	customerId?: string | undefined;
	startDate?: Date;
	endDate?: Date;
	index?: number;
};
const StatisticPage = ({ index, customerId = "", startDate, endDate }: StatisticPageType) => {
	let initialquery = {};
	if (customerId) {
		initialquery = { customer: customerId };
	}
	if (startDate) {
		initialquery = { ...initialquery, startDate: startDate };
	}
	if (endDate) {
		initialquery = { ...initialquery, endDate: endDate };
	}
	const [tableParams, setTableParams] = useState<TableParams>({
		query: {
			// page: 1,
			// limit: 10,
			...initialquery,
		},
	});
	///SERVİCE
	const tableData = debtServices.totaldebtQuery(tableParams);

	return (
		<>
			{/* {startDate?.toISOString()} {endDate?.toISOString()} */}
			<Popover
				content={
					<div>
						<p>Satılan: {`${tableData.data?.buy || 0}`}</p>
						<p>alınan: {`${tableData.data?.sell || 0}`}</p>
						<p>Toplam : {`${tableData.data?.totalAmount || 0}`}</p>
					</div>
				}>
				<Card bordered={false}>
					<Statistic
						title={`${(index || 0) + 1} Ay`}
						value={Number(tableData.data?.totalAmount || 0)}
						precision={0}
						valueStyle={{ color: "#cf1322" }}
						// prefix={<ArrowDownOutlined />}
						suffix="TL"
					/>
				</Card>
			</Popover>
		</>
	);
};

export default function DebtStatistic() {
	let d = new Date();

	let list = [...Array(12).keys()].map((i, index) => daysInMonth(i + 1, d.getFullYear()));
	return (
		<Row gutter={16}>
			<Col span={24}>
				<h3>Aylara göre Alacak </h3>
				{/* {JSON.stringify(list)} */}
			</Col>
			{/* <StatisticPage
				startDate={new Date(d.getFullYear(), 10, 1)}
				endDate={new Date(d.getFullYear(), 10, list[10])}
			/> */}

			{list.map((i, index) => (
				<Col span={4} style={{ paddingBottom: 5 }}>
					<StatisticPage
						key={index + "StatisticPage"}
						index={index}
						startDate={new Date(d.getFullYear(), index, 1)}
						endDate={new Date(d.getFullYear(), index, i + 1)}
					/>
				</Col>
			))}
		</Row>
	);
}
