const { Router } = require("express");

const usersRouter = require("./users.routes");
const accountsRouter = require("./accounts.routes");

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/accounts", accountsRouter);

module.exports = routes;
