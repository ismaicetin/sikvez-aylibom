const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

var d = new Date();
var SchemaModel = new Schema(
	{
		tc: {
			type: String,
			required: [true, "lutfen TC alanını  Giriniz"],
			minlength: [11, "TC alanı  11 Karakter giriniz"],
			maxlength: [11, "TC alanı  11 Karakter giriniz"],
			unique: true,
		},
		name: {
			type: String,
			required: [true, "lutfen name alanını  Giriniz"],
			maxlength: [20, "Name alanı maximum 20 Karakter"],
			// unique: true,
		},
		surname: {
			type: String,
			required: [true, "lutfen name alanını  Giriniz"],
			maxlength: [20, "Name alanı maximum 20 Karakter"],
			// unique: true,
		},

		active: { type: Boolean, default: true },
		password: { type: String, default: null },
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

SchemaModel.plugin(mongoosePaginate);

module.exports = mongoose.model("user", SchemaModel);
