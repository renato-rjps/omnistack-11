exports.up = function(knex) {
  return knex.schema.createTable("incidents", function(table) {
    table.increments("id");

    table.string("title", 255).notNullable();
    table.string("description", 255).notNullable();
    table.decimal("value").notNullable();

    table.string("ong_id", 255).notNullable();

    table
      .foreign("ong_id")
      .references("id")
      .inTable("ongs");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("incidents");
};
