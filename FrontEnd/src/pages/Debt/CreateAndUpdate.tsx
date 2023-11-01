//debt
import { Button, Form } from "antd";
import { debtType } from "src/type";
import GenericFormItem from "src/components/GenericFormItem";
import * as debtServices from "src/service/debtServices";
import { usePopupStore } from "src/context/popupContext";

type CreateAndUpdateType = { data?: debtType };

const CreateAndUpdate = ({ data }: CreateAndUpdateType) => {
	let create = debtServices.create();
	let update = debtServices.update();
	const [callback, updatePopupStore] = usePopupStore((store) => store.callback);

	const onFinish = (values: debtType) => {
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
		<Form<debtType>
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
