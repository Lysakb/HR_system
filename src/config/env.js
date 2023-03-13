const dotenv = require("dotenv");

dotenv.config();

module.exports = { PORT, SECRET_KEY, MONGO_DB_CONNECTION_URL } = process.env;
