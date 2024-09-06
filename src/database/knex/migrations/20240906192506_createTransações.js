exports.up = knex => knex.schema.createTable("transações", table => {});

exports.down = knex => knex.schema.dropTable("transações");
