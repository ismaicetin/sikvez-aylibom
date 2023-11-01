//customer
import { Button, Form } from "antd";
import { customerType } from "src/type";
import GenericFormItem from "src/components/GenericFormItem";
import * as customerServices from "src/service/customerServices";
import { usePopupStore } from "src/context/popupContext";

type CreateAndUpdateType = { data?: customerType };

const CreateAndUpdate = ({ data }: CreateAndUpdateType) => {
	let create = customerServices.create();
	let update = customerServices.update();
	const [callback, updatePopupStore] = usePopupStore((store) => store.callback);

	const onFinish = (values: customerType) => {
		// console.log("Success:", values);
		if (data?._id) {
			update.mutate(values, {
				onSuccess() {
					callback && callback();
					updatePopupStore({ show: false });
				},
			});
		} else {
			// for (let index = 0; index < 20; index++) {
			// 	create.mutate({
			// 		name: `ismail_${index}`,
			// 		surname: `cetin_${index}`,
			// 		telefon: `0000${index}`,
			// 		totalDebt: index,
			// 	});
			// }

			create.mutate(values, {
				onSuccess() {
					callback && callback();
					updatePopupStore({ show: false });
				},
			});
		}
	};

	return (
		<Form<customerType>
			disabled={create.isLoading || update.isLoading}
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 600 }}
			initialValues={{ ...data }}
			onFinish={onFinish}
			autoComplete="off">
			{data?._id && <GenericFormItem name="_id" type="Input" label="id" disabled />}
			<GenericFormItem name="name" type="Input" label="Kullanıcı adı" required />
			<GenericFormItem name="surname" type="Input" label="Kullanıcı soyadı" required />
			<GenericFormItem name="telefon" type="Input" label="Telefon" required />
			<GenericFormItem name="totalDebt" type="InputNumber" label="Toplam Alacak" required />

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					{data?._id ? "Güncelle" : "Yeni Oluştur"}
				</Button>
			</Form.Item>
		</Form>
	);
};
export default CreateAndUpdate;
