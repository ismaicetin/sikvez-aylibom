//user
import { Button, Form } from "antd";
import { userType } from "src/type";
import GenericFormItem from "src/components/GenericFormItem";
import * as userServices from "src/service/userServices";
import { usePopupStore } from "src/context/popupContext";

type CreateAndUpdateType = { data?: userType };

const CreateAndUpdate = ({ data }: CreateAndUpdateType) => {
	let create = userServices.create();
	let update = userServices.update();
	const [callback, updatePopupStore] = usePopupStore((store) => store.callback);

	const onFinish = (values: userType) => {
		// console.log("Success:", values);
		if (data?._id) {
			update.mutate(values, {
				onSuccess() {
					callback && callback();
					updatePopupStore({ show: false });
				},
			});
		} else {
			create.mutate(values, {
				onSuccess() {
					callback && callback();
					updatePopupStore({ show: false });
				},
			});
		}
	};
	return (
		<Form<userType>
			disabled={create.isLoading || update.isLoading}
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 600 }}
			initialValues={{ ...data }}
			onFinish={onFinish}
			autoComplete="off">
			{data?._id && <GenericFormItem name="_id" type="Input" label="id" disabled />}
			<GenericFormItem name="tc" type="Input" label="TC" required disabled={!!data?._id} />
			<GenericFormItem name="name" type="Input" label="Kullanıcı adı" required />
			<GenericFormItem name="surname" type="Input" label="Kullanıcı soyadı" required />
			<GenericFormItem name="password" type="Input" label="Kullanıcı şifresi" />

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					{data?._id ? "Güncelle" : "Yeni Oluştur"}
				</Button>
			</Form.Item>
		</Form>
	);
};
export default CreateAndUpdate;
