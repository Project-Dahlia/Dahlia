const User = require('../models/user');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const moment = require('moment');
const { Op } = require('sequelize');

const {
  generateToken,
  sanitizeUserData
} = require('../middleware/auth-middleware');
const responseWrapper = require('../utils/response-wrapper');

// Load environment variables from .env file
dotenv.config();

// Register user
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
    responseWrapper(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      {},
      'Internal server error'
    );
  }
};

//Login user
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
    responseWrapper(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      {},
      'Internal server error'
    );
  }
};

//Google login
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
    responseWrapper(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      {},
      'Internal server error'
    );
  }
};

//Password reset
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return responseWrapper(
        res,
        httpStatus.NOT_FOUND,
        {},
        'No user found with that email'
      );
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    // Send the email with the reset link
    const resetLink = `${process.env.FRONTEND_URL}/change-password?token=${resetToken}`;
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${resetLink}\n\n
     
      If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    await transporter.sendMail(mailOptions);

    responseWrapper(
      res,
      httpStatus.OK,
      {},
      'An email has been sent to ' + user.email + ' with further instructions.'
    );
  } catch (error) {
    responseWrapper(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      {},
      'Error initiating password reset'
    );
  }
};

const resetPassword = async (req, res) => {
  const token = req.body['token'];
  const password = req.body['newPassword'];

  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,

        resetPasswordExpires: { [Op.gte]: moment() }
      }
    });
    if (!user) {
      return responseWrapper(
        res,
        httpStatus.BAD_REQUEST,
        {},
        'Password reset token is invalid or has expired'
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    responseWrapper(
      res,
      httpStatus.OK,
      {},
      'Password has been reset successfully'
    );
  } catch (error) {
    responseWrapper(
      res,
      httpStatus.INTERNAL_SERVER_ERROR,
      {},
      'Error resetting password'
    );
  }
};

module.exports = {
  register,
  login,
  googleLogin,
  requestPasswordReset,
  resetPassword
};
