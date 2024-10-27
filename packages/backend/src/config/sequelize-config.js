// Purpose: Provides configuration specifically for Sequelize CLI to use for migrations and other CLI tasks.
// Role: This file is used by Sequelize CLI to read the configuration needed to connect to the database.
// It should directly export the configuration object without creating a Sequelize instance.

const dotenv = require('dotenv');

// Determine the environment and load the appropriate .env file
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
const result = dotenv.config({ path: envFile });

if (result.error) {
  throw new Error(`Failed to load ${envFile}: ${result.error.message}`);
}

// Required environment variables for development/production and test
const requiredEnvVars = {
  common: [
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_NAME',
    'DB_HOST',
    'DB_PORT',
    'PORT'
  ]
};

// Validate that the required environment variables are set
const checkMissingVars = (vars) =>
  vars.filter((varName) => !process.env[varName]);

const missingVars = checkMissingVars(requiredEnvVars.common);

if (missingVars.length > 0) {
  throw new Error(
    `Missing required environment variables: ${missingVars.join(', ')}`
  );
}

// Export configurations for different environments
module.exports = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  dialect: 'postgres',
  PORT: process.env.PORT || 3001
};
