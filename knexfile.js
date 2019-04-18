// Update with your config settings.

require("dotenv").config();
const localPgConnection = {
  // ssl: true,
  // host: "ec2-50-17-227-28.compute-1.amazonaws.com", // address to find the db server
  // database: "d5o4dtujrpg9al",
  // user: 'omtrxnwrrmnqlp',
  // password: 'b24a23ae2a09e78209cfba495e1d9d596942bf9b2424fb24e5293c9cb46c30a7'
};

const dbConnection = process.env.DATABASE_URL || localPgConnection;

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
    pool: {
      min: 2,
      max: 10
    },
    useNullAsDefault: true,
    migrations: {
      // tableName: "knex_migrations",
      directory: "./data/migrations"
    }
    
  }
};
