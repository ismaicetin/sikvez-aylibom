var _ = require("lodash");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const httpResult = require("../config");

exports.login = async (req, res, next) => {
	let payload = req.body;
	const dbRes = await userModel.findOne(
		{
			tc: payload.tc,
			password: payload.password,
		},
		{ password: 0 }
	);
	if (dbRes) {
		var user = dbRes._doc;
		const token = jwt.sign({ ...user }, httpResult.secret);
		user["token"] = token;
		return req.returnTemplate(user, "");
	} else {
		return req.returnTemplate(null, "Kullanıcı bulunamadı", httpResult.error);
	}
};

exports.list = async (req, res) => {
	req.query;
	let query = {};
	Object.keys(req.body).map((i) => {
		query[i] = new RegExp(req.body[i], "i"); // constructor
	});

	let row = await userModel.paginate(query, { page: 1, limit: 10, ...req.query, select: { password: 0 } });
	return req.returnTemplate(row, "", 200);
};

exports.create = async (req, res, next) => {
	let payload = req.body;
	var new_userModel = new userModel(payload);
	let row = await new_userModel.save();

	return req.returnTemplate(row, "Creating");
};

exports.getUserIdFromEmail = async (req, res) => {
	let row = await userModel.find({ mail: req.params.id }).select({ password: 0 });
	return req.returnTemplate(row, "");
};

exports.getById = async (req, res) => {
	let row = await userModel.findOne({ _id: req.params.id }).select({ password: 0 });
	return req.returnTemplate(row, "");
};

exports.update = async (req, res) => {
	userModel
		.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, row) => {
			if (err) {
				return req.returnTemplate([], err, httpResult.error);
			}
			return req.returnTemplate(row, "");
		})
		.select({ password: 0 });
};

exports.delete = async (req, res) => {
	// let rowT = await userModel.findOne({ _id: req.params.id });

	userModel.remove({ _id: req.params.id }, async (err, row) => {
		if (err) {
			return req.returnTemplate([], err, httpResult.notFound);
		}

		return req.returnTemplate([], "başarı ile silinmiştir");
	});
};
