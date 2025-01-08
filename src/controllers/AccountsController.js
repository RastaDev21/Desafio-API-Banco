const knex = require("../database/knex");

class AccountsController {
  async balance(request, response) {
    const id = request.user.accountsId;

    const { balance } = await knex("accounts")
      .where({ id })
      .select("balance")
      .first();

    return response.json(balance);
  }

  async addMoney(request, response) {
    const { value, accountNumber } = request.body;

    const account = await knex("accounts").where({ id: accountNumber }).first();

    if (!account) {
      return response.status(404).json({ error: "Conta inválida." });
    }

    await knex("accounts")
      .where({ id: accountNumber })
      .increment({ balance: value });

    return response.json(
      `Você adicionou ${value} na conta ${accountNumber}, com sucesso!`
    );
  }

  async removeMoney(request, response) {
    const { value } = request.body;
    const { accountsId: accountNumber } = request.user;

    const account = await knex("accounts")
      .where({ id: accountNumber })
      .select("balance")
      .first();

    if (!account) {
      return response.status(404).json({ error: "Conta não encontrada." });
    }

    if (account.balance < value) {
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
    console.log("Corpo da requisição recebido:", request.body);
    const { accountNumber, userId } = request.body;

    console.log("Número da conta recebido:", accountNumber);

    const account = await knex("accounts").where({ id: accountNumber }).first();

    if (!account) {
      return response.status(404).json({
        error: "Conta inválida. Verifique o número da conta e tente novamente.",
      });
    }

    console.log("Número da conta recebido:", accountNumber);

    if (account.balance > 0) {
      return response.status(400).json({
        error:
          "Conta não pode ser fechada com saldo positivo. Saque seu dinheiro para poder encerrar sua conta.",
      });
    }

    await knex("users").where({ id: userId }).delete();

    console.log(`Conta ${accountNumber} fechada com sucesso.`);
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
    const { accountTo, value } = request.body;
    const { accountsId: accountFrom } = request.user;

    const accountSending = await knex("accounts")
      .where({ id: accountFrom })
      .first();

    const accountReceivable = await knex("accounts")
      .where({ id: accountTo })
      .first();

    if (!accountSending) {
      return response.status(404).json({
        error:
          "Você tentou fazer uma transferência de uma conta que não existe.",
      });
    }

    if (!accountReceivable) {
      return response.status(404).json({
        error:
          "Você tentou fazer uma transferência para uma conta que não existe, passe uma conta válida.",
      });
    }

    const { balance } = accountSending;

    if (balance < value) {
      return response
        .status(400)
        .json({ error: "Saldo insuficiente para transferência." });
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
