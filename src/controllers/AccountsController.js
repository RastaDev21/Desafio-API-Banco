const knex = require("../database/knex");

class AccountsController {
  async create(request, response) {
    const { balance } = request.body;
    const { userId } = request.params;

    await knex("accounts").insert({ balance, userId });

    response.json();
  }
}

module.exports = AccountsController;
