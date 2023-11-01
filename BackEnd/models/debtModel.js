const { text } = require("body-parser");
const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

var d = new Date();
var SchemaModel = new Schema(
	{
		customer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "customer",
		},
		stockCode: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "stock",
		},
		amount: { type: Number, default: 0, required: true },
		description: { type: String }, //borcun alınacagı tarih
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

SchemaModel.plugin(mongoosePaginate);

module.exports = mongoose.model("debt", SchemaModel);
