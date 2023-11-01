const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

var user = "admin";
var pass = "1q2w3e4r";
var db = "zevkis";
var domain = "127.0.0.1";
var port = "27017";
//const dbURI = `mongodb+srv://${user}:${pass}@avukat.spatcbc.mongodb.net/${db}?retryWrites=true&w=majority`;

const dbURI = `mongodb://127.0.0.1:27017/${db}`;

// const dbURI = `mongodb://${user}:${pass}@${domain}:${port}/${db}`
// const dbURI = `mongodb://${domain}:${port}/${db}`

const options = {
	// reconnectTries: Number.MAX_VALUE,
	// poolSize: 10,
	// useNewUrlParser: true,
	// useUnifiedTopology: true
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
};

mongoose.connect(dbURI, options).then(
	() => {
		console.log("Veritabanına baglanıldı");
	},
	(err) => {
		console.log("Veritabanı hatası: ", err);
	}
);
