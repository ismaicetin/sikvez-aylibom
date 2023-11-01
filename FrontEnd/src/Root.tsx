import { Outlet, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "src/context/AuthProvider";
import LoginPage from "src/pages/LoginPage";
// import ProtectedPage from "src/pages/ProtectedPage";
import UserPage from "src/pages/User";
import Customer from "src/pages/Customer";
import React, { useState } from "react";
import { PieChartOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Layout, theme } from "antd";
import { userType } from "./type";
import * as authServices from "./service/authServices";
import Dashboard from "./pages/Dashboard";
import StockPage from "./pages/Stock";
import DebtPage from "./pages/Debt";

const { Header, Content, Footer, Sider } = Layout;

const LayoutD: React.FC = () => {
	const navigate = useNavigate();
	let location = useLocation();

	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
				<div className="demo-logo-vertical" />
				<Menu
					theme="dark"
					defaultSelectedKeys={[location.pathname]}
					selectedKeys={[location.pathname]}
					mode="inline"
					items={[
						{
							key: "/",
							icon: <PieChartOutlined />,
							label: "Dashboard",
						},
						{
							key: "/customer",
							icon: <TeamOutlined />,
							label: "Musteri",
						},
						{
							key: "/debt",
							icon: <UserOutlined />,
							label: "Alışveriş",
						},
						{
							key: "/stok",
							icon: <UserOutlined />,
							label: "Stok",
						},
						{
							key: "/user",
							icon: <UserOutlined />,
							label: "Kullanıcı",
						},
					]}
					onSelect={(e) => {
						// console.log(e);
						navigate(e.key);
					}}
				/>
			</Sider>
			<Layout>
				<CustomHeader />
				<Content>
					<div style={{ marginTop: "1rem", background: colorBgContainer, color: "black", padding: 15 }}>
						<Outlet />
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}>ismaicetin@hotmail.com © {new Date().getFullYear()}</Footer>
			</Layout>
		</Layout>
	);
};

const CustomHeader = () => {
	const [user] = useAuthStore((store) => store.user);
	const {
		token: { colorBgContainer },
	} = theme.useToken();

	return (
		<Header style={{ padding: "0 15px", background: colorBgContainer, textAlign: "right" }}>
			{`${(user as userType).name} ${(user as userType).surname}`}

			<button onClick={() => authServices.logout()}>Çıkış</button>
		</Header>
	);
};
const Root = () => {
	const [token] = useAuthStore((store) => store.token);

	return (
		<Routes>
			{!token ? (
				<Route path="*" element={<LoginPage />} />
			) : (
				<Route element={<LayoutD />}>
					<Route path="/user" element={<UserPage />} />
					<Route path="/customer" element={<Customer />} />
					<Route path="/stok" element={<StockPage />} />
					<Route path="/debt" element={<DebtPage />} />
					<Route path="*" element={<Dashboard />} />
				</Route>
			)}
		</Routes>
	);
};

export default Root;
