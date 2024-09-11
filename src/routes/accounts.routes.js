const { Router } = require("express");

const AccountsController = require("../controllers/AccountsController");

const accountsRoutes = Router();

const accountsController = new AccountsController();

accountsRoutes.get("/balance/:id", accountsController.accounts);
accountsRoutes.post("/addMoney", accountsController.addMoney);

module.exports = accountsRoutes;
