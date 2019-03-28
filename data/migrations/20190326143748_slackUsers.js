exports.up = function(knex) {
  return knex.schema.createTable('slackUsers', slackUsers => {
      slackUsers.increments();
      //! not sure about the type yet
      slackUsers
        .string('accessToken')
        .notNullable();

      slackUsers
        .string('userId')
        .notNullable();
      
      slackUsers
        .string('teamName')
        .notNullable();
      
      slackUsers
        .string('teamId')
        .notNullable();

      slackUsers
        .string('botUserId');

      slackUsers
        .string('botAccessToken');

      slackUsers
        .integer('userEmail')
	      .unique()
        .notNullable();

      slackUsers
        .string('channelId');

  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('slackUsers');
};