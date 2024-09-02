class UsersController {
  create(request, response) {
    const { name, rg, cpf, dateOfBirth } = request.body;

    response.status(201).json({ name, rg, cpf, dateOfBirth });
  }
}

module.exports = UsersController;
