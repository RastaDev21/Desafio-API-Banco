const knex = require("../database/knex");

class AccountsController {
  async balance(request, response) {
    const { id } = request.params;

    const { balance } = await knex("accounts")
      .where({ id })
      .select("balance")
      .first();

    return response.json(`Seu saldo atual é ${balance}`);
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

    const { balance } = await knex("accounts")
      .where({ id: accountNumber })
      .select("balance")
      .first();

    if (balance < value) {
      return response.status(400).json({ error: "Saldo insuficiente." });
    }

    await knex("accounts")
      .where({ id: accountNumber })
      .decrement({ balance: value });

    return response.json(
      `Você retirou ${value} da conta ${accountNumber}, com sucesso!`
    );
  }
  async accountClosure(request, response) {
    const { accountNumber } = request.body;
    const account = await knex("accounts")
      .where({ id: accountNumber })
      .select("balance")
      .first();

    if (!account) {
      return response.status(404).json({
        error: "Conta inválida. Verifique o número da conta e tente novamente.",
      });
    }

    if (account.balance > 0) {
      return response.status(400).json({
        error:
          "Conta não pode ser fechada com saldo positivo. Saque seu dinheiro para poder encerrar sua conta.",
      });
    }

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

  async accountsUser(request, response) {
    const { accountNumber } = request.body;

    const accounts = await knex("accounts").where({ userId: accountNumber });

    return response.json(accounts);
  }
  async transfer(request, response) {
    const { accountFrom, accountTo, value } = request.body;

    const { balance } = await knex("accounts")
      .where({ id: accountFrom })
      .select("balance")
      .first();

    if (balance < value) {
      return response
        .status(400)
        .json({ error: "Saldo insuficiente para transferencia." });
    }

    await knex("accounts")
      .where({ id: accountFrom })
      .decrement({ balance: value });

    await knex("accounts")
      .where({ id: accountTo })
      .increment({ balance: value });

    return response.json(
      `Você transferiu ${value} para a conta ${accountTo}, com sucesso!`
    );
  }
}

module.exports = AccountsController;
