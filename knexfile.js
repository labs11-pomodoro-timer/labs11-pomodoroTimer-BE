// Update with your config settings.

require("dotenv").config();
// const localPgConnection = {
//   host: "localhost", // address to find the db server
//   database: "focustimer",
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS
// };

const dbConnection = process.env.DATABASE_URL || null;

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/focustimer.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + "/data/migrations"
    },
    seeds: {
      directory: __dirname + "/data/seeds/development"
    }
  },
  production: {
    client: "pg",
    connection: dbConnection,
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    useNullAsDefault: true,
    migrations: {
      // tableName: "knex_migrations",
      directory: "./data/migrations"
    }
    
  }
};
