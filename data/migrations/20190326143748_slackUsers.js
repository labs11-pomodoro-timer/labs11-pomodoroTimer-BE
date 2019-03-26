
exports.up = function(knex) {
  return knex.schema.createTable('slackUsers', slackUsers => {
      slackUsers.increments();
      //! not sure about the type yet
      slackUsers
        .string('slackAuth', 128)
        .notNullable()
        .unique();

      slackUsers
        .integer('userId', 6)
        .unsigned()
        .notNullable();

  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('slackUsers');
};
