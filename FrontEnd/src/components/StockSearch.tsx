import { Spin } from "antd";
import { TableParams } from "src/type";
import GenericFormItem from "src/components/GenericFormItem";
import * as stockServices from "src/service/stocksServices";
import { useState } from "react";

const StokSearchDropDown = () => {
	const [tableParams, setTableParams] = useState<TableParams>({
		query: {
			page: 1,
			limit: 10,
		},
		payload: {},
	});

	///SERVİCE
	const tableData = stockServices.stocksUseQuery(tableParams);

	return (
		<GenericFormItem
			showSearch
			name="stockCode"
			type="Select"
			label="Ürün"
			// labelInValue
			filterOption={false}
			onSearch={(e) => {
				setTableParams((prew) => {
					return { ...prew, payload: { name: e } };
				});
			}}
			notFoundContent={tableData.isFetching ? <Spin size="small" /> : null}
			options={tableData.data?.docs.map((i) => ({
				disabled: 1 > i.count,
				value: i._id,
				label: `${i.name} \t (${i.count} Adet) `,
			}))}
		/>
	);
};
export default StokSearchDropDown;
