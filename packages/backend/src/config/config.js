require('dotenv').config();

const PORT = process.env.PORT || 3000;

let DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT;

if (process.env.NODE_ENV === 'test') {
  DB_NAME = 'dahlia_db_test';
  DB_USER = 'postgres';
  DB_PASSWORD = '0478';
  DB_HOST = 'localhost';
  DB_PORT = 5432;
} else if (process.env.NODE_ENV === 'development') {
  console.log('DEVELOPMENT');
  DB_NAME = process.env.DB_NAME_DEV;
  DB_USER = process.env.DB_USERNAME_DEV;
  DB_PASSWORD = process.env.DB_PASSWORD_DEV;
  DB_HOST = process.env.DB_HOST_DEV;
  DB_PORT = process.env.DB_PORT_DEV;
} else if (process.env.NODE_ENV === 'production') {
  DB_NAME = process.env.DB_NAME;
  DB_USER = process.env.DB_USERNAME;
  DB_PASSWORD = process.env.DB_PASSWORD;
  DB_HOST = process.env.DB_HOST;
  DB_PORT = process.env.DB_PORT;
}

module.exports = {
  DB_NAME,
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT
};
