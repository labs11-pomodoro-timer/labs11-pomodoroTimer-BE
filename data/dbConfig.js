const dbEngine = process.env.DB_ENGINE || "production";
const config = require("../knexfile.js")[dbEngine];

module.exports = require("knex")(config);
