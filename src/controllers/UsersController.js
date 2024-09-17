const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const sqliteConnection = require("../database/sqlite");

class UsersController {
  async create(request, response) {
    const { name, rg, cpf, dateOfBirth, password } = request.body;

    const database = await sqliteConnection();
    const checkUserExists = await database.get(
      "SELECT * FROM users WHERE Cpf = (?)",
      [cpf]
    );

    if (checkUserExists) {
      throw new AppError("Já existe um usuário com este Cpf.");
    }

    const hashedPassword = await hash(password, 8);

    const user = await database.run(
      "INSERT INTO users (name, rg, cpf, data_de_nascimento, password) VALUES (?,?,?,?,?)",
      [name, rg, cpf, dateOfBirth, hashedPassword]
    );

    await database.run("INSERT INTO accounts (balance, userId) VALUES (?,?)", [
      0,
      user.lastID,
    ]);
    response.status(201).json();
  }

  async update(request, response) {
    const { name, rg, cpf, dateOfBirth, password, old_password } = request.body;
    const { id } = request.params;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id =(?)", [id]);

    if (!user) {
      throw new AppError("Usuário não encontrado.");
    }

    const userWithUpdatedCpf = await database.get(
      "SELECT * FROM users WHERE cpf =(?)",
      [cpf]
    );

    if (userWithUpdatedCpf && userWithUpdatedCpf.id !== user.id) {
      throw new AppError("Já existe um usuário com este Cpf.");
    }

    user.name = name ?? user.name;
    user.rg = rg ?? user.Rg;
    user.cpf = cpf ?? user.Cpf;
    user.data_de_nascimento = dateOfBirth ?? user.data_de_nascimento;

    if (password && !old_password) {
      throw new AppError(
        "Você precisa informar a senha antiga para definir a nova senha"
      );
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Senha antiga inválida.");
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `
      UPDATE users SET
      name =?,
      rg =?,
      cpf =?,
      data_de_nascimento =?,
      password =?,
      updated_at = DATETIME('now')
      WHERE id =?`,
      [user.name, user.rg, user.cpf, user.data_de_nascimento, user.password, id]
    );

    return response.json();
  }
}

module.exports = UsersController;
