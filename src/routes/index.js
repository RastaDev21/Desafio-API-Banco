const { Router } = require("express");

const usersRouter = require("./users.routes");
const accountsRouter = require("./accounts.routes");
const sessionsRouter = require("./sessions.routes");

const routes = Router();
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/accounts", accountsRouter);

module.exports = routes;
