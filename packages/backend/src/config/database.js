const { Sequelize } = require('sequelize');
const config = require('./config');

// Sequelize configuration
const sequelize = new Sequelize({
  database: config.DB_NAME,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  host: config.DB_HOST,
  port: config.DB_PORT,
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

    console.log(`${config.DB_NAME} DB Connected and synced `);
  } catch (error) {
    console.log(`Unable to connect to the ${config.DB_NAME} database`, error);
  }
};

checkConnection();

module.exports = sequelize;
