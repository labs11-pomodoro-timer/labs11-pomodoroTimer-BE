
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('slackUsers').del()
    .then(function () {
      // Inserts seed entries
      return knex('slackUsers').insert([
        { id: 1, slackAuth: 'UHE5L8NB5432', userId: 5,},
        { id: 2, slackAuth: 'UHE5L8NB8594', userId: 2,},
        { id: 3, slackAuth: 'U7GYL8NB7143', userId: 4,},
        { id: 4, slackAuth: 'NJ9RL8NB2098', userId: 3,},
        { id: 5, slackAuth: 'UHEKH74B4150', userId: 1,}
      ]);
    });
};
