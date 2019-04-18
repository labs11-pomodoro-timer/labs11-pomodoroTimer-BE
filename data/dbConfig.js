const dbEngine = process.env.DB_ENGINE || "development";
const config = require("../knexfile.js")[dbEngine];

module.exports = require("knex")(config);
