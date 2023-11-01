const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const Schema = mongoose.Schema;

var d = new Date();
var SchemaModel = new Schema(
	{
		name: { type: String, required: true },
		count: { type: Number, default: 0, required: true },
		purchasePrice: { type: Number, default: 0 },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

SchemaModel.plugin(mongoosePaginate);
SchemaModel.plugin(aggregatePaginate);

module.exports = mongoose.model("stock", SchemaModel);
