exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
        users.increments();

        users
            .string('firstname', 20)
            .notNullable();

        users
            .string('lastname', 20)
            .notNullable();

        users
            .string('email', 128)
            .notNullable()
            .unique();

        users
            .integer('phone', 10);

        users
            .string('timerName', 30)

        users
            .integer('timerStart', 20);

        users
            .integer('timerEnd', 20);

        users
            .boolean('premiumUser')
            .defaultTo(false);
    })

};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};