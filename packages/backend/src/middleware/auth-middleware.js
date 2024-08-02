const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res
      .status(httpStatus.UNAUTHORIZED)
      .json({ error: 'Access denied, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).json({ error: 'Invalid token' });
  }
};

// add token generator
const generateToken = (user) => {
  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: 60 * 60 }
  );
  return token;
};

// add user data sanitizer
const sanitizeUserData = (user) => {
  const sanitizedUserData = user.toJSON();
  delete sanitizedUserData.password;
  delete sanitizedUserData.deletedAt;
  return sanitizedUserData;
};

module.exports = { authMiddleware, generateToken, sanitizeUserData };
