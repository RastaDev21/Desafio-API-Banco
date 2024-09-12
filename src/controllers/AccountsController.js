const knex = require("../database/knex");

class AccountsController {
  async balance(request, response) {
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

  async removeMoney(request, response) {
    const { value, accountNumber } = request.body;

    await knex("accounts")
      .where({ id: accountNumber })
      .decrement({ balance: value });

    return response.json(
      `Você retirou ${value} da conta ${accountNumber}, com sucesso!`
    );
  }

  async accountClosure(request, response) {
    const { accountNumber } = request.body;

    await knex("accounts").where({ id: accountNumber }).delete();

    return response.json(`Conta ${accountNumber} fechada com sucesso.`);
  }

  async createAccount(request, response) {
    const { balance, userId } = request.body;

    const accountNumber = await knex("accounts")
      .insert({
        balance,
        userId,
      })
      .returning("id");

    return response.json(
      `Sua conta foi criada com sucesso numero ${accountNumber[0].id}`
    );
  }
}

module.exports = AccountsController;

// buscar todas as contas dos usuarios
