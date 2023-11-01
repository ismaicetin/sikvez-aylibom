//debt
import { Button, Form } from "antd";
import { debtType, customerType } from "src/type";
import GenericFormItem from "src/components/GenericFormItem";
import StockSearch from "src/components/StockSearch";
import * as debtServices from "src/service/debtServices";
import { usePopupStore } from "src/context/popupContext";

type CreateAndUpdateType = { data?: customerType };

const CreateAndUpdate = ({ data }: CreateAndUpdateType) => {
	let create = debtServices.create();
	let update = debtServices.update();
	const [callback, updatePopupStore] = usePopupStore((store) => store.callback);

	const onFinish = (values: debtType) => {
		// console.log("Success:", values);
		create.mutate(values, {
			onSuccess() {
				callback && callback();
				updatePopupStore({ show: false });
			},
		});
	};

	return (
		<Form<debtType>
			disabled={create.isLoading || update.isLoading}
			name="basic"
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 600 }}
			initialValues={{ customer: data?._id }}
			onFinish={onFinish}
			autoComplete="off">
			<GenericFormItem name="customer" type="Input" label="Kullanıcı adı" hide />
			<StockSearch />
			<GenericFormItem name="amount" type="InputNumber" label="Tutar" required />
			<GenericFormItem name="description" type="Input" label="Acıklama" required />
			{/* <GenericFormItem name="debtWillReceiveDate" type="RangePicker" label="Ödeme Tarihi" /> */}
			<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
				<Button type="primary" htmlType="submit">
					Borç Ekle
				</Button>
			</Form.Item>
		</Form>
	);
};
export default CreateAndUpdate;
