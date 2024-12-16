'use strict';
import { DataTypes } from 'sequelize';
import bcrypt from "bcrypt";

import sequelize from '../config/database.js';
import AppError from '../utils/appError.js';

const User = sequelize.define(
  'users',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userType: {
      type: DataTypes.ENUM('admin', 'user', 'guest'),
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      set(value) {
          if (this.password.length < 7) {
              throw new AppError(
                  'Password length must be grater than 7',
                  400
              );
          }
          if (value === this.password) {
              const hashPassword = bcrypt.hashSync(value, 10);
              this.setDataValue('password', hashPassword);
          } else {
              throw new AppError(
                  'Password and confirm password must be the same',
                  400
              );
          }
      },
  },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
);

export default User;