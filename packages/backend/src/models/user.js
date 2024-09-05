const { DataTypes } = require('sequelize');
const sequelize = require('../config/db-auth-user');

// Define the User model
const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, // Allow null initially
      validate: {
        // Custom validator to check password
        isValidPassword(value) {
          if (value === null && !this.googleId) {
            throw new Error('Please enter a password or sign in with Google.');
          }
        }
      }
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    updatedBy: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    resetPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true
    },
    resetPasswordExpires: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    // Exclude password and deletedAt fields by default when converting to JSON
    defaultScope: {
      attributes: { exclude: ['password', 'deletedAt'] }
    }
  }
);

module.exports = User;
