const { Router } = require("express");

const AccountsController = require("../controllers/AccountsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const accountsRoutes = Router();

const accountsController = new AccountsController();

accountsRoutes.use(ensureAuthenticated);

accountsRoutes.get("/balance", accountsController.balance);
accountsRoutes.post("/addMoney", accountsController.addMoney);
accountsRoutes.post("/removeMoney", accountsController.removeMoney);
accountsRoutes.delete("/accountsClosure", accountsController.accountClosure);
accountsRoutes.post("/createAccount", accountsController.createAccount);
accountsRoutes.get("/accountsUser", accountsController.accountsUser);
accountsRoutes.post("/transfer", accountsController.transfer);

module.exports = accountsRoutes;
