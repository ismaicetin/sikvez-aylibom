const customerModel = require("../models/customerModel");
const httpResult = require("../config");
const mongoose = require("mongoose");

exports.list = async (req, res) => {
	// req.query;
	let query = {};
	let { _id, ...payload } = req.body;
	if (_id) {
		query["_id"] = mongoose.Types.ObjectId(_id);
	}
	Object.keys(payload).map((i) => {
		query[i] = new RegExp(payload[i], "i"); // constructor
	});

	let row = await customerModel.paginate(query, { page: 1, limit: 10, ...req.query, select: { password: 0 } });
	return req.returnTemplate(row, "", 200);
};
exports.create = async (req, res, next) => {
	let payload = req.body;
	// if (validator.isEmpty(payload?.name || "")) {
	// 	return req.returnTemplate([], "name is Empty", httpResult.error);
	// }
	var new_customerModel = new customerModel(payload);
	let row = await new_customerModel.save();

	return req.returnTemplate(row, "Creating");
};

exports.getById = async (req, res) => {
	let row = await customerModel.findOne({ _id: req.params.id }).select({ password: 0 });
	return req.returnTemplate(row, "");
};

exports.update = async (req, res) => {
	customerModel
		.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, row) => {
			if (err) {
				return req.returnTemplate([], err, httpResult.error);
			}
			return req.returnTemplate(row, "");
		})
		.select({ password: 0 });
};

exports.delete = async (req, res) => {
	// let rowT = await customerModel.findOne({ _id: req.params.id });

	customerModel.remove({ _id: req.params.id }, async (err, row) => {
		if (err) {
			return req.returnTemplate([], err, httpResult.notFound);
		}
		return req.returnTemplate([], "başarı ile silinmiştir");
	});
};

exports.fourMonthsNonPaymentList = async (req, res) => {
	var date = new Date();

	// add a day
	date.setMonth(date.getMonth() - 4);
	console.log(date.toLocaleDateString());
	let query = {
		totalDebt: { $gte: 1 },
		lastDebtPayDate: { $lte: date },
	};
	let row = await customerModel.paginate(query, { page: 1, limit: 10, ...req.query });
	return req.returnTemplate(row, "", 200);
};
