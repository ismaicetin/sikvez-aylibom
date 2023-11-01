var _ = require("lodash");
const stocksModel = require("../models/stocksModel");
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

	let row = await stocksModel.paginate(query, { page: 1, limit: 10, ...req.query, select: { password: 0 } });
	return req.returnTemplate(row, "", 200);
};

exports.create = async (req, res, next) => {
	let payload = req.body;
	var new_stocksModel = new stocksModel(payload);
	let row = await new_stocksModel.save();

	return req.returnTemplate(row, "Creating");
};

exports.getById = async (req, res) => {
	let row = await stocksModel.findOne({ _id: req.params.id });
	return req.returnTemplate(row, "");
};

exports.decrementStock = async (stockCode) => {
	let row = await stocksModel.updateOne(
		{ _id: stockCode, count: { $gte: 1 } },
		{ $inc: { count: -1 } },
		{ new: true, upsert: true }
	);
};

exports.update = async (req, res) => {
	stocksModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, row) => {
		if (err) {
			return req.returnTemplate([], err, httpResult.error);
		}
		return req.returnTemplate(row, "");
	});
};

exports.delete = async (req, res) => {
	stocksModel.remove({ _id: req.params.id }, async (err, row) => {
		if (err) {
			return req.returnTemplate([], err, httpResult.notFound);
		}

		return req.returnTemplate([], "başarı ile silinmiştir");
	});
};

exports.totalCost = async (req, res) => {
	var d = new Date();
	let matchJSON = {};
	let { startDate, endDate, customer, ...otherQuery } = req.query;
	if (startDate) {
		matchJSON["createDate"] = { ...matchJSON["createDate"], $gte: new Date(startDate) };
	}
	if (endDate) {
		matchJSON["createDate"] = { ...matchJSON["createDate"], $lte: new Date(endDate) };
	}
	if (customer) {
		matchJSON["customer"] = mongoose.Types.ObjectId(customer);
	}

	let query = {};
	Object.keys(otherQuery).map((i) => {
		query[i] = new RegExp(otherQuery[i], "i"); // constructor
	});

	matchJSON = { ...matchJSON, ...query };
	let row = await stocksModel.aggregate([
		{ $match: matchJSON },
		{ $group: { _id: null, totalAmount: { $sum: "$amount" } } },
	]);

	return req.returnTemplate(row[0], "", 200);
};
