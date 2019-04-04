const dbEngine = process.env.DB_Engine || "development";
const config = require("../knexfile.js")[dbEngine];

module.exports = require("knex")(config);
