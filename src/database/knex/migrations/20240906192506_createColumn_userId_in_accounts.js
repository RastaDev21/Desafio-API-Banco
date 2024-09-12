exports.up = knex =>
  knex.schema.table("accounts", table => {
    table.integer("userId").references("id").inTable("users");
  });

exports.down = knex => {
  return knex.schema.table("accounts", table => {
    table.dropColumn("userId");
  });
};
