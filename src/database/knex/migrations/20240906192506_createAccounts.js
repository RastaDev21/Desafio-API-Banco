exports.up = knex =>
  knex.schema.createTable("accounts", table => {
    table.increments("id");
    table.text("balance");
    // table.integer("user_id").references("id").inTable("users");
  });

exports.down = knex => knex.schema.dropTable("accounts");

//Saldo ,Adicionar,Retirar
