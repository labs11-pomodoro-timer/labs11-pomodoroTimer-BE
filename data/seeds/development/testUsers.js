
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('testing').del()
    .then(function () {
      // Inserts seed entries
      return knex('testing').insert([
        {id: 1, email: 'mjhacker@gmail.com'},
        {id: 2, email: 'email@email.com'},
        {id: 3, email: 'send@me.edu'}
      ]);
    });
};
