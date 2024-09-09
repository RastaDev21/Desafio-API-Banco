const { Router } = require("express");

const AccountsController = require("../controllers/AccountsController");

const accountsRoutes = Router();

const accountsController = new AccountsController();

accountsRoutes.post("/:user_id", accountsController);

module.exports = accountsController;
