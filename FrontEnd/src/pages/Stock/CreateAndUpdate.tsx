//stock
import { Button, Form } from "antd";
import { stockType } from "src/type";
import GenericFormItem from "src/components/GenericFormItem";
import * as stockServices from "src/service/stocksServices";
import { usePopupStore } from "src/context/popupContext";

type CreateAndUpdateType = { data?: stockType };

const CreateAndUpdate = ({ data }: CreateAndUpdateType) => {
	let create = stockServices.create();
	let update = stockServices.update();
	const [callback, updatePopupStore] = usePopupStore((store) => store.callback);

	const onFinish = (values: stockType) => {
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
		<Form<stockType>
			disabled={create.isLoading || update.isLoading}
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 600 }}
			initialValues={{ ...data }}
			onFinish={onFinish}
			autoComplete="off">
			{data?._id && <GenericFormItem name="_id" type="Input" label="id" disabled />}
			<GenericFormItem name="name" type="Input" label="Ürün adı" required />
			<GenericFormItem name="count" type="InputNumber" label="Ürün adeti" required />
			<GenericFormItem name="purchasePrice" type="InputNumber" label="Satın Alınan Fiyatı" required />

			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					{data?._id ? "Güncelle" : "Yeni Oluştur"}
				</Button>
			</Form.Item>
		</Form>
	);
};
export default CreateAndUpdate;
