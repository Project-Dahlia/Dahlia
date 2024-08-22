const sequelize = require('./p-database'); // Path to your Sequelize instance

// Sync models with database
async function syncModels() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database & tables created or updated!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

// Call syncModels to ensure the table exists
syncModels();
