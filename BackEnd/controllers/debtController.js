var _ = require("lodash");
const debtModel = require("../models/debtModel");
const customerModel = require("../models/customerModel");
const customerController = require("../controllers/customerController");
const stocksController = require("../controllers/stocksController");
const httpResult = require("../config");
const mongoose = require("mongoose");

exports.list = async (req, res) => {
	let query = {};
	let debtModelQuery = {};
	let { _id, sort, ...payload } = req.body;
	if (_id) {
		query["_id"] = mongoose.Types.ObjectId(_id);
	}
	if (payload) {
		Object.keys(payload).map((i) => {
			query[i] = new RegExp(payload[i], "i"); // constructor
		});
		console.log(query);

		let customerList = await customerModel.find({ ...query }).select("_id");
		customerList = customerList.map((i) => i._id);
		debtModelQuery = { customer: { $in: customerList } };
	}

	let row = await debtModel.paginate(debtModelQuery, {
		page: 1,
		limit: 10,
		select: { password: 0 },
		populate: ["customer", "stockCode"],
		...req.query,
	});

	return req.returnTemplate(row, "", 200);
};

exports.updateCustomerTotalDebt = async (customer, lastDebtPayDate = false) => {
	await this.totalDebt({
		query: { customer: customer },
		returnTemplate: async (_totalDebt) => {
			let customerPayload = { totalDebt: _totalDebt?.totalAmount || 0 };
			if (lastDebtPayDate) customerPayload["lastDebtPayDate"] = new Date();
			await customerController.update({
				params: { id: customer },
				body: { ...customerPayload },
				returnTemplate: () => {
					console.log("totalDebt güncellendi");
				},
			});
		},
	});
};

exports.create = async (req, res, next) => {
	let payload = req.body;
	var new_debtModel = new debtModel(payload);
	let row = await new_debtModel.save();
	await this.updateCustomerTotalDebt(payload.customer, (payload?.amount || 0) < 0);
	if (payload.stockCode && payload?.amount > 0) await stocksController.decrementStock(payload.stockCode);
	return req.returnTemplate(row, "Creating");
};

exports.getById = async (req, res) => {
	let row = await debtModel.findOne({ _id: req.params.id }).select({ password: 0 });
	return req.returnTemplate(row, "");
};

exports.update = async (req, res) => {
	debtModel
		.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, row) => {
			if (err) {
				return req.returnTemplate([], err, httpResult.error);
			}

			return req.returnTemplate(row, "");
		})
		.select({ password: 0 });
};

exports.delete = async (req, res) => {
	let payload = await debtModel.findOne({ _id: req.params.id }).select({ password: 0 });

	debtModel.remove({ _id: req.params.id }, async (err, row) => {
		if (err) {
			return req.returnTemplate([], err, httpResult.notFound);
		}
		await this.updateCustomerTotalDebt(payload.customer._id.toString());

		return req.returnTemplate([], "başarı ile silinmiştir");
	});
};

exports.totalDebt = async (req, res) => {
	var d = new Date();
	let matchJSON = {};
	let { startDate, endDate, customer, ...otherQuery } = req.query;

	if (startDate) {
		matchJSON["createdAt"] = { ...matchJSON["createdAt"], $gte: new Date(startDate) };
	}
	if (endDate) {
		matchJSON["createdAt"] = { ...matchJSON["createdAt"], $lte: new Date(endDate) };
	}
	if (customer) {
		matchJSON["customer"] = mongoose.Types.ObjectId(customer);
	}

	let query = {};
	Object.keys(otherQuery).map((i) => {
		query[i] = new RegExp(otherQuery[i], "i"); // constructor
	});

	matchJSON = { ...matchJSON, ...query };
	let row = await debtModel.aggregate([
		{ $match: matchJSON },
		{ $group: { _id: null, totalAmount: { $sum: "$amount" } } },
	]);

	let buy = await debtModel.aggregate([
		{ $match: { ...matchJSON, amount: { $gte: 0 } } },
		{ $group: { _id: null, totalAmount: { $sum: "$amount" } } },
	]);

	let sell = await debtModel.aggregate([
		{ $match: { ...matchJSON, amount: { $lte: 0 } } },
		{ $group: { _id: null, totalAmount: { $sum: "$amount" } } },
	]);
	return req.returnTemplate(
		{
			totalAmount: row?.[0]?.totalAmount,
			buy: buy?.[0]?.totalAmount,
			sell: sell?.[0]?.totalAmount,
		},
		"",
		200
	);
};

exports.debtWillReceiveDate = async (req, res) => {
	let row = await debtModel.paginate(
		{ debtWillReceiveDate: { $gte: new Date() } },
		{
			// page: 1,
			// limit: 10,
			populate: "customer",
			sort: "debtWillReceiveDate",
		}
	);

	return req.returnTemplate(row, "", 200);
};
