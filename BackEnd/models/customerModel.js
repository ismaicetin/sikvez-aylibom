const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;
var d = new Date();
var SchemaModel = new Schema(
	{
		name: {
			type: String,
			required: [true, "lutfen name alanını  Giriniz"],
		},
		surname: {
			type: String,
			required: [true, "lutfen Soyadı alanını  Giriniz"],
		},
		telefon: { type: String, required: true, unique: true },
		totalDebt: { type: Number, default: 0 }, //toplam borç
		lastDebtPayDate: { type: Date, default: d.getTime() }, //son ödenen tarih
	},
	{
		versionKey: false,
		timestamps: true,
	}
);
SchemaModel.plugin(mongoosePaginate);

module.exports = mongoose.model("customer", SchemaModel);
