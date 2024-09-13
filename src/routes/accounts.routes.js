const { Router } = require("express");

const AccountsController = require("../controllers/AccountsController");

const accountsRoutes = Router();

const accountsController = new AccountsController();

accountsRoutes.get("/balance/:id", accountsController.balance);
accountsRoutes.post("/addMoney", accountsController.addMoney);
accountsRoutes.post("/removeMoney", accountsController.removeMoney);
accountsRoutes.delete("/accountsClosure", accountsController.accountClosure);
accountsRoutes.post("/createAccount", accountsController.createAccount);
accountsRoutes.get("/accountsUser", accountsController.accountsUser);

module.exports = accountsRoutes;
