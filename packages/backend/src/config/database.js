//This file creates a Sequelize instance for use in the application code

const { Sequelize } = require('sequelize');
const config = require('./sequelize-config');

// Sequelize configuration
const sequelize = new Sequelize({
  database: config.database,
  username: config.username,
  password: config.password,
  host: config.host,
  port: config.port,
  dialect: 'postgres',
  pool: {
    max: 64,
    min: 2,
    acquire: 300000,
    idle: 30000
  }
});

const checkConnection = async () => {
  try {
    await sequelize.authenticate();

    await sequelize.sync({ force: false });

    console.log(`${config.database} DB Connected and synced `);
  } catch (error) {
    console.log(`Unable to connect to the ${config.database} database`, error);
  }
};

checkConnection();

module.exports = sequelize;
