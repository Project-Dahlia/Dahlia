const httpStatus = require('http-status');

const home = async (req, res) => {
  res.status(httpStatus.CREATED).send('Home route is working!');
};

module.exports = {
  home
};
