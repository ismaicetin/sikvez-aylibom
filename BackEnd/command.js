// const config = require('./config');
// var path = require("path");
// var fs = require("fs");
const config = require("./config");
const jwt = require("jsonwebtoken");

let publicUrl = ["/api/checkout", "/api/login"];

exports.ResponseModify = (req, res, next) => {
	req.returnTemplate = function returnJson(data, message, status = 200) {
		let responseTemplate = {
			status: status,
			data: data,
			message: message,
		};
		res.status(status).json(responseTemplate);
	};
	next();
};

exports.TokenKontrol = (req, res, next) => {
	//public url kontrolü
	for (let index = 0; index < publicUrl.length; index++) {
		if (publicUrl[index] === req.url) {
			return next();
		}
	}

	let token = req.headers["x-access-token"] || req.headers["authorization"] || req.headers["Authorization"];
	const bearer = (token || " ").split(" ");
	const bearerToken = bearer[1];

	if (!bearerToken) {
		return req.returnTemplate(false, "Token YOK Lütfen Giriş Yapınız", httpResult.error);
	}
	jwt.verify(bearerToken, config.secret, (err, decoded) => {
		if (err) {
			return req.returnTemplate([], "Token Geçerli Degil Lütfen Tekrar Giriş Yapınız.", httpResult.error);
		} else {
			req.TokenUser = decoded;
			next();
		}
	});
};
