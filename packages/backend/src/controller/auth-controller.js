'use strict';

const User = require('../models/user');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const moment = require('moment');
const { Op } = require('sequelize');
const { OAuth2Client } = require('google-auth-library');

const {
  generateToken,
  generateRefreshToken,
  verifyRefreshToken,
  sanitizeUserData
} = require('../middleware/auth-middleware');
const responseWrapper = require('../utils/response-wrapper');

// Load environment variables from .env file
dotenv.config();

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register user
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return responseWrapper(
        res,
        httpStatus.CONFLICT,
        {},
        'Email already in use'
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store hashed refresh token
    const hashedRefresh = await bcrypt.hash(refreshToken, 10);
    user.refreshToken = hashedRefresh;
    await user.save();

    const sanitizedUserData = sanitizeUserData(user);

    responseWrapper(
      res,
      httpStatus.CREATED,
      { token, refreshToken, user: sanitizedUserData },
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

    const token = generateToken(user);
    const refreshToken = generateRefreshToken(user);

    const hashedRefresh = await bcrypt.hash(refreshToken, 10);
    user.refreshToken = hashedRefresh;
    await user.save();

    const sanitizedUserData = sanitizeUserData(user);

    responseWrapper(
      res,
      httpStatus.OK,
      { token, refreshToken, user: sanitizedUserData },
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

//Google login — verifies the ID token with Google before trusting claims
const googleLogin = async (req, res) => {
  const { email, name, googleId, idToken } = req.body;

  try {
    // Verify the Google ID token
    let ticket;
    try {
      ticket = await googleClient.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID
      });
    } catch (verifyErr) {
      return responseWrapper(
        res,
        httpStatus.UNAUTHORIZED,
        {},
        'Google token verification failed'
      );
    }

    const payload = ticket.getPayload();
    if (payload.sub !== googleId || payload.email !== email) {
      return responseWrapper(
        res,
        httpStatus.UNAUTHORIZED,
        {},
        'Token claims do not match provided identity'
      );
    }

    let user = await User.findOne({ where: { email } });

    if (user) {
      if (user.googleId && user.googleId !== googleId) {
        return responseWrapper(
          res,
          httpStatus.UNAUTHORIZED,
          {},
          'Invalid credentials'
        );
      }
      // Update googleId if first Google login for this email
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }

      const sanitizedUserData = sanitizeUserData(user);
      return responseWrapper(
        res,
        httpStatus.OK,
        { user: sanitizedUserData },
        'Login successful'
      );
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

// Refresh access token using a valid refresh token
const refreshToken = async (req, res) => {
  const { refreshToken: token } = req.body;
  if (!token) {
    return responseWrapper(
      res,
      httpStatus.BAD_REQUEST,
      {},
      'Refresh token is required'
    );
  }

  try {
    const decoded = verifyRefreshToken(token);

    const user = await User.findByPk(decoded.userId, {
      attributes: ['id', 'name', 'email', 'refreshToken']
    });
    if (!user || !user.refreshToken) {
      return responseWrapper(
        res,
        httpStatus.UNAUTHORIZED,
        {},
        'Invalid refresh token'
      );
    }

    const tokenMatches = await bcrypt.compare(token, user.refreshToken);
    if (!tokenMatches) {
      return responseWrapper(
        res,
        httpStatus.UNAUTHORIZED,
        {},
        'Invalid refresh token'
      );
    }

    const newAccessToken = generateToken(user);
    const newRefreshToken = generateRefreshToken(user);
    const hashedRefresh = await bcrypt.hash(newRefreshToken, 10);
    user.refreshToken = hashedRefresh;
    await user.save();

    responseWrapper(
      res,
      httpStatus.OK,
      { token: newAccessToken, refreshToken: newRefreshToken },
      'Token refreshed'
    );
  } catch (error) {
    responseWrapper(
      res,
      httpStatus.UNAUTHORIZED,
      {},
      'Invalid or expired refresh token'
    );
  }
};

//Password reset
const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      // Return success to avoid email enumeration
      return responseWrapper(
        res,
        httpStatus.OK,
        {},
        'If that email exists, a reset link has been sent.'
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
      'If that email exists, a reset link has been sent.'
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
  refreshToken,
  requestPasswordReset,
  resetPassword
};

