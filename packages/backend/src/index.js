const app = require('./app');
const config = require('./config/sequelize-config');

// Start the Express app
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
