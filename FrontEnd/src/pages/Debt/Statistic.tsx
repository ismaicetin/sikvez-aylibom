import React, { useState } from "react";
// import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import * as debtServices from "src/service/debtServices";
import { TableParams } from "src/type";

const StatisticPage = ({ customerId }: { customerId?: string | null }) => {
	let initialquery = {};
	if (customerId) {
		initialquery = { customer: customerId };
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
		<Row gutter={16}>
			{/* <Col span={12}>
				<Card bordered={false}>
					<Statistic
						title="Aylık Borç"
						value={Number(tableData.data?.totalAmount || 0)}
						precision={2}
						valueStyle={{ color: "#3f8600" }}
						// prefix={<ArrowUpOutlined />}
						suffix="TL"
					/>
				</Card>
			</Col> */}
			<Col span={12}>
				<Card bordered={false}>
					<Statistic
						title="Toplam Alacak"
						value={Number(tableData.data?.totalAmount || 0)}
						precision={2}
						valueStyle={{ color: "#cf1322" }}
						// prefix={<ArrowDownOutlined />}
						suffix="TL"
					/>
				</Card>
			</Col>
		</Row>
	);
};

export default StatisticPage;
