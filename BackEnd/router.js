var express = require("express");
var router = express.Router();

const userController = require("./controllers/userController");
const customerController = require("./controllers/customerController");
const stocksController = require("./controllers/stocksController");
const debtController = require("./controllers/debtController");

//login
router.post("/login", userController.login);
//users
router.get("/users", userController.list);
router.post("/usersList", userController.list);
router.get("/users/:id", userController.getById);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

//customers
router.get("/customers", customerController.list);
router.post("/customersList", customerController.list);
router.post("/fourMonthsNonPaymentList", customerController.fourMonthsNonPaymentList);
router.get("/customers/:id", customerController.getById);
router.post("/customers", customerController.create);
router.put("/customers/:id", customerController.update);
router.delete("/customers/:id", customerController.delete);

//customers
router.get("/stocks", stocksController.list);
router.post("/stocksList", stocksController.list);
router.get("/stocks/:id", stocksController.getById);
router.post("/stocks", stocksController.create);
router.put("/stocks/:id", stocksController.update);
router.delete("/stocks/:id", stocksController.delete);

//customers
router.get("/debts", debtController.list);
router.post("/debtsList", debtController.list);
router.get("/debts/:id", debtController.getById);
router.post("/debts", debtController.create);
router.put("/debts/:id", debtController.update);
router.delete("/debts/:id", debtController.delete);
router.post("/totaldebt", debtController.totalDebt);
router.post("/debtWillReceiveDate", debtController.debtWillReceiveDate);

router.get("/", (req, res) => {
	return "Destek için 0531 321 1110 ara ";
});
module.exports = router;
