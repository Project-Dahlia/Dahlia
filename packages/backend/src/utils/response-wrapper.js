const responseWrapper = (res, statusCode, data = {}, message = '') => {
  res.status(statusCode).json({
    status: statusCode,
    message,
    data
  });
};

module.exports = responseWrapper;
