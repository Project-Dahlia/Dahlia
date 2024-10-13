const httpStatus = require('http-status');
const Test = require('../../__tests__/testdb');

const home = async (req, res) => {
  res.status(httpStatus.OK).send('Home route is working!');
};

const test = async (req, res) => {
  const { firstName, lastName } = req.body;
  const test = await Test.create({
    firstName,
    lastName
  });

  res
    .status(httpStatus.CREATED)
    .json({ test, message: 'Test created successfully!' });
};

module.exports = {
  home,
  test
};
