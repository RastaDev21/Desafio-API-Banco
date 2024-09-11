const knex = require("../database/knex");

class AccountsController {
  async accounts(request, response) {
    const { id } = request.params;

    const accounts = await knex("accounts").where({ id });

    return response.status(201).json(accounts);
  }

  async addMoney(request, response) {
    const { value, accountNumber } = request.body;

    await knex("accounts")
      .where({ id: accountNumber })
      .increment({ balance: value });

    return response.json(
      `Você adicionou ${value} na conta ${accountNumber}, com sucesso!`
    );
  }
}

module.exports = AccountsController;
