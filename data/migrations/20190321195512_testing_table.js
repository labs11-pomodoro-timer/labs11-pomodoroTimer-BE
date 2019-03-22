
exports.up = function(knex) {
    return knex.schema.createTable('testing', testing => {
        testing.increments();

        testing
            .string('email', 128)
            .notNullable()
            .unique();
    })
  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('testing');
};