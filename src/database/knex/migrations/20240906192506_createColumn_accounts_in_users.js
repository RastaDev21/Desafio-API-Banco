exports.up = knex =>
  knex.schema.table("users", table => {
    table.integer("accountsId").references("id").inTable("accounts");
  });

exports.down = knex => {
  return knex.schema.table("users", table => {
    table.dropColumn("accountsId");
  });
};

//Saldo ,Adicionar,Retirar
