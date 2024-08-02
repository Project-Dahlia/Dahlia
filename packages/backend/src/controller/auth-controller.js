const User = require('../models/user');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const {
  generateToken,
  sanitizeUserData
} = require('../middleware/auth-middleware');
const responseWrapper = require('../utils/response-wrapper');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return responseWrapper(
        res,
        httpStatus.BAD_REQUEST,
        {},
        'All fields are required'
      );
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return responseWrapper(
        res,
        httpStatus.BAD_REQUEST,
        {},
        'Email already in use'
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate JWT token
    const token = generateToken(user);

    // Sanitize user data
    const sanitizedUserData = sanitizeUserData(user);

    responseWrapper(
      res,
      httpStatus.CREATED,
      { token, user: sanitizedUserData },
      'User created successfully'
    );
  } catch (error) {
    console.error('Registration error:', error);
    responseWrapper(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      {},
      'Internal server error'
    );
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return responseWrapper(
        res,
        httpStatus.BAD_REQUEST,
        {},
        'Email and password are required'
      );
    }

    const user = await User.findOne({
      where: { email },
      attributes: ['id', 'name', 'email', 'password']
    });
    if (!user) {
      return responseWrapper(
        res,
        httpStatus.UNAUTHORIZED,
        {},
        'Invalid credentials'
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return responseWrapper(
        res,
        httpStatus.UNAUTHORIZED,
        {},
        'Invalid credentials'
      );
    }

    // Generate JWT token
    const token = generateToken(user);

    // Sanitize user data
    const sanitizedUserData = sanitizeUserData(user);

    responseWrapper(
      res,
      httpStatus.OK,
      { token, user: sanitizedUserData },
      'Login successful'
    );
  } catch (error) {
    console.error('Login error:', error);
    responseWrapper(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      {},
      'Internal server error'
    );
  }
};

const googleLogin = async (req, res) => {
  const { email, name, googleId } = req.body;

  try {
    if (!email || !googleId) {
      return responseWrapper(
        res,
        httpStatus.BAD_REQUEST,
        {},
        'Email and Google ID are required'
      );
    }

    let user = await User.findOne({ where: { email } });

    if (user) {
      if (user.googleId === googleId) {
        const sanitizedUserData = sanitizeUserData(user);
        return responseWrapper(
          res,
          httpStatus.OK,
          { user: sanitizedUserData },
          'Login successful'
        );
      } else {
        return responseWrapper(
          res,
          httpStatus.UNAUTHORIZED,
          {},
          'Invalid credentials'
        );
      }
    } else {
      user = await User.create({ name, email, googleId });
      const sanitizedUserData = sanitizeUserData(user);
      responseWrapper(
        res,
        httpStatus.CREATED,
        { user: sanitizedUserData },
        'User created successfully'
      );
    }
  } catch (error) {
    console.error('Google login error:', error);
    responseWrapper(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      {},
      'Internal server error'
    );
  }
};

module.exports = {
  register,
  login,
  googleLogin
};
