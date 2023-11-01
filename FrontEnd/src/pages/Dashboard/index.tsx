import React from "react";
// import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
// import { Card, Col, Row, Statistic } from "antd";
// import CostStatistic from "src/pages/Cost/Statistic";
import DebtStatistic from "./DebtStatistic";
import FourMonthsNonPaymentList from "src/pages/Dashboard/FourMonthsNonPaymentList";

const Dashboard = () => (
	<>
		{/* <CostStatistic />*/}
		<DebtStatistic />
		<hr style={{ borderColor: "#0000002b" }} />
		<FourMonthsNonPaymentList />
		{/* <Row gutter={16}>
			<Col span={12}>
				<Card bordered={false}>
					<Statistic
						title="Aylık Kazanç"
						value={11.28}
						precision={2}
						valueStyle={{ color: "#3f8600" }}
						// prefix={<ArrowUpOutlined />}
						suffix="TL"
					/>
				</Card>
			</Col>
			<Col span={12}>
				<Card bordered={false}>
					<Statistic
						title="Idle"
						value={9030.3}
						precision={2}
						valueStyle={{ color: "#cf1322" }}
						// prefix={<ArrowDownOutlined />}
						suffix="TL"
					/>
				</Card>
			</Col>
		</Row> */}
	</>
);

export default Dashboard;
