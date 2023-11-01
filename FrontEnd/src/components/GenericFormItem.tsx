import {
	DatePicker,
	DatePickerProps,
	Input,
	Form,
	InputProps,
	Radio,
	Select,
	SelectProps,
	Switch,
	SwitchProps,
} from "antd";
import { Rule } from "antd/es/form";
import Search, { SearchProps } from "antd/es/input/Search";
import { DefaultOptionType } from "antd/es/select";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export enum typeEnumList {
	// ConfirmationCode = 'ConfirmationCode',
	// DatePicker = 'DatePicker',
	// TimePicker = 'TimePicker',
	RangePicker = "RangePicker",
	Input = "Input",
	// InputCurrency = 'InputCurrency',
	InputNumber = "InputNumber",
	Password = "Password",
	Select = "Select",
	// TextArea = 'TextArea',
	RadioGroup = "RadioGroup",
	// InputModal = 'InputModal',
	Switch = "Switch",
	// ButtonModal = 'ButtonModal',
	Search = "Search",
}

export const dropDownList = (Object.keys(typeEnumList) as Array<keyof typeof typeEnumList>).map((key: string) => ({
	value: key,
	label: key,
}));

export type typeEnum = keyof typeof typeEnumList;
type valueType = string | number | boolean | Date | null;

type generalProps = {
	label?: string;
	name?: any;
	value?: valueType;
	disabled?: boolean;
	xs?: number;
	sm?: number;
	md?: number;
	lg?: number;
	xl?: number;
	required?: string | boolean | Rule[];
	loading?: boolean;
	rules?: Rule[];
	hide?: boolean;
};

type GenericFormItemType =
	| ({ type: "Input" } & generalProps & Omit<InputProps, "required">)
	| ({ type: "Password" } & generalProps & Omit<InputProps, "required">)
	| ({ type: "Select"; multiple?: boolean } & generalProps & SelectProps)
	| ({ type: "InputNumber" } & generalProps & InputProps)
	| ({ type: "RangePicker"; range?: boolean } & generalProps & DatePickerProps)
	| ({ type: "RadioGroup"; options: Array<DefaultOptionType> } & generalProps)
	| ({ type: "Switch" } & generalProps & SwitchProps)
	| ({ type: "Search" } & generalProps & SearchProps);

const GenericFormItem = (props: GenericFormItemType) => {
	const {
		type,
		label = "",
		name = "",
		value,
		disabled = false,
		loading = false,
		// xs = 24,
		// sm = 24,
		// md = 12,
		// lg = 8,
		// xl,
		required,
		rules = [],
		hide = false,
	} = props;
	// const colProps = { xs, sm, md, lg, xl }
	const _disabled = disabled || loading;
	const getFormContentSelector = () => {
		switch (type) {
			case typeEnumList.Input:
				return <Input disabled={_disabled} />;
			case typeEnumList.Password:
				return <Input.Password disabled={_disabled} />;
			case typeEnumList.Select: {
				const { options, allowClear = true, multiple, ...continueProps } = props;
				return (
					<Select
						{...continueProps}
						options={options}
						loading={loading}
						disabled={_disabled}
						allowClear={allowClear}
						maxTagCount="responsive"
						{...(multiple && { mode: "multiple" })}
					/>
				);
			}
			case typeEnumList.InputNumber:
				return <Input type="number" disabled={_disabled} />;
			case typeEnumList.RangePicker: {
				const { range } = props;
				if (range) {
					return <DatePicker.RangePicker format={"YYYY-MM-DD"} />;
				}
				return <DatePicker format={"YYYY-MM-DD"} />;
			}
			case typeEnumList.RadioGroup: {
				const { options } = props;
				return (
					<Radio.Group>
						{options.map((i: DefaultOptionType, index: number) => (
							<Radio key={`${i.label}+${index}`} value={i.value}>
								{i.label}
							</Radio>
						))}
					</Radio.Group>
				);
			}
			case typeEnumList.Switch: {
				const { ...continueProps } = props;
				return <Switch {...continueProps} loading={loading} disabled={disabled} />;
			}
			case typeEnumList.Search: {
				const { ...continueProps } = props;
				return <Search {...continueProps} loading={loading} disabled={disabled} />;
			}
			default:
				return <div> {typeof value == "object" ? <pre>{JSON.stringify(value, null, 2)}</pre> : value}</div>;
		}
	};

	///RULES
	let tempRules: Rule[] = [];

	if (typeof required == "boolean") {
		tempRules = [{ required: true }];
	} else if (typeof required == "string") {
		tempRules = [{ required: true, message: required }];
	} else if (rules) {
		tempRules = [...tempRules, ...rules];
	}

	return (
		<>
			{/* <Col {...colProps}> */}
			{/* {JSON.stringify(value)} */}
			<Form.Item
				label={label}
				name={name}
				rules={tempRules}
				{...(type == typeEnumList.Switch && { valuePropName: "checked" })}
				{...(hide && { style: { display: "none" } })}>
				{getFormContentSelector()}
			</Form.Item>
			{/* </Col> */}
		</>
	);
};

export default GenericFormItem;
