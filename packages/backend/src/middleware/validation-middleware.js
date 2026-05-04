'use strict';

const { body, validationResult } = require('express-validator');
const httpStatus = require('http-status');

/**
 * Middleware that reads express-validator errors and returns 400 if any exist.
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(httpStatus.BAD_REQUEST).json({ errors: errors.array() });
  }
  next();
};

const registerRules = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ max: 100 }).withMessage('Name must be at most 100 characters.')
    .matches(/^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/).withMessage('Name may only contain letters, hyphens, and spaces.'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('A valid email address is required.')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 6, max: 128 }).withMessage('Password must be 6–128 characters.')
];

const loginRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('A valid email address is required.')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 1, max: 128 }).withMessage('Password must not be empty.')
];

const resetRequestRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('A valid email address is required.')
    .normalizeEmail()
];

const resetPasswordRules = [
  body('token')
    .trim()
    .notEmpty().withMessage('Reset token is required.'),
  body('newPassword')
    .notEmpty().withMessage('New password is required.')
    .isLength({ min: 6, max: 128 }).withMessage('Password must be 6–128 characters.')
];

const googleLoginRules = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('A valid email address is required.')
    .normalizeEmail(),
  body('googleId')
    .trim()
    .notEmpty().withMessage('Google ID is required.'),
  body('idToken')
    .trim()
    .notEmpty().withMessage('Google ID token is required.')
];

module.exports = {
  validate,
  registerRules,
  loginRules,
  resetRequestRules,
  resetPasswordRules,
  googleLoginRules
};
