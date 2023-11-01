import { Button, Card, Form } from "antd";
import { loginType } from "src/type";
import GenericFormItem from "src/components/GenericFormItem";
import * as authServices from "src/service/authServices";
import { useAuthStore } from "src/context/AuthProvider";

const Login = () => {
	let login = authServices.login();
	const [, updateAuthProvider] = useAuthStore(() => null);

	const onFinish = (values: loginType) => {
		// console.log("Success:", values);
		login.mutate(values, {
			onSuccess(response) {
				// console.log(response);
				localStorage.setItem("token", response?.data?.token || "");
				updateAuthProvider({ token: response?.data?.token, user: response?.data });
			},
		});
	};
	return (
		<div className="login">
			<Card title="Giriş Yap" bordered={false} style={{ width: 300 }}>
				<Form<loginType>
					name="basic"
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					style={{ maxWidth: 600 }}
					// initialValues={{ remember: true }}
					onFinish={onFinish}
					autoComplete="off">
					<GenericFormItem type="Input" label="Tc No" name="tc" required="Kullanıcı TC giriniz" />
					<GenericFormItem type="Password" label="Şifre" name="password" required="Şifre giriniz" />

					<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
						<Button type="primary" htmlType="submit">
							Giriş Yap
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};
export default Login;
