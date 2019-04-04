exports.up = function(knex) {
  return knex.schema.createTable('testing', testing => {
      testing.increments();

      testing
          .string('firstname', 20)
          .notNullable();

      testing
          .string('lastname', 20)
          .notNullable();

      testing
          .string('email', 128)
          .notNullable()
          .unique();

      testing
          .integer('phone', 10);

      testing
          .string('timerName', 30)
    
      testing
          .integer('timerStart', 20);

      testing
          .integer('timerEnd', 20);

  })

};

exports.down = function(knex, Promise) {
return knex.schema.dropTableIfExists('testing');
};