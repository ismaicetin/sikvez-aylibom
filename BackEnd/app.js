const express = require("express");
var fs = require("fs");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("express-async-errors");
const morganBody = require("morgan-body");
const command = require("./command");
const logErrors = require("./utils/logErrors");
const errorHandler = require("./utils/errorHandler");
const userController = require("./controllers/userController");
process.env.TZ = "Europe/Istanbul";

require("./config/db");

var date = new Date();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(cors());
// create a write stream (in append mode)

var accessLogStream = fs.createWriteStream(
	__dirname + `/logs/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}.log`,
	{ flags: "a" }
);

// morganBody(app);

app.use((req, res, next) => {
	console.clear();
	next();
});

// geri dondurulecek degeri otomatik yapacak
app.use(command.ResponseModify);
// app.post("/admin", userController.create);//ilk Kullanıcı oluşturmak için

app.use(command.TokenKontrol);

morganBody(app, {
	stream: accessLogStream,
	noColors: true,
	dateTimeFormat: "utc",
	logReqHeaderList: true,
});
// API ENDPOINTS

app.use("/api", require("./router"));
app.use(logErrors);
app.use(errorHandler);

const port = 3001;
const server = app.listen(port, function () {
	console.log(`Server (Açmak için ctrl + Left click) http://localhost:${port}`);
});
