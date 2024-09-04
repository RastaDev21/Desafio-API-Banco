const AppError = require("../utils/AppError");

class UsersController {
  create(request, response) {
    const { name, rg, cpf, dateOfBirth } = request.body;

    if (!name) {
      throw new AppError("Nome é obrigatório");
    }

    response.status(201).json({ name, rg, cpf, dateOfBirth });
  }
}

module.exports = UsersController;
