require("dotenv").config();
const {DB_USER,DB_PASS,DB_NAME} = process.env;

module.exports = {
  "development": {
    "username": DB_USER || "root",
    "password": DB_PASS || "dominion",
    "database": DB_NAME || "delivery",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": DB_USER,
    "password": DB_PASS,
    "database": DB_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": DB_USER,
    "password": DB_PASS,
    "database": DB_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
