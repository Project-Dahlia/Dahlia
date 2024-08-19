// This file is used by the application code for database configuration

require('dotenv').config();

const PORT = process.env.PORT || 3001;

let DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DIALECT;

if (process.env.NODE_ENV === 'test') {
  DB_NAME = process.env.DB_NAME_TEST;
  DB_USER = process.env.DB_USERNAME_TEST;
  DB_PASSWORD = process.env.DB_PASSWORD_TEST;
  DB_HOST = process.env.DB_HOST_TEST;
  DB_PORT = process.env.DB_PORT_TEST;
  DIALECT = 'postgres'; 
} else if (process.env.NODE_ENV === 'development') {
  DB_NAME = process.env.DB_NAME_DEV;
  DB_USER = process.env.DB_USERNAME_DEV;
  DB_PASSWORD = process.env.DB_PASSWORD_DEV;
  DB_HOST = process.env.DB_HOST_DEV;
  DB_PORT = process.env.DB_PORT_DEV;
  DIALECT = 'postgres'; 
} else if (process.env.NODE_ENV === 'production') {
  DB_NAME = process.env.DB_NAME;
  DB_USER = process.env.DB_USERNAME;
  DB_PASSWORD = process.env.DB_PASSWORD;
  DB_HOST = process.env.DB_HOST;
  DB_PORT = process.env.DB_PORT;
  DIALECT = 'postgres'; 
}

module.exports = {
  DB_NAME,
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DIALECT
};
