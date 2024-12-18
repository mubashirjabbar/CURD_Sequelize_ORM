'use strict';
import { DataTypes } from 'sequelize';
import bcrypt from "bcrypt";

import sequelize from '../config/database.js';
import AppError from '../utils/appError.js';
import Project from './projectModel.js';

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
      // allowNull: false,
      // validate: {
      //   notEmpty: "User type cannot be empty",
      // },
      // notNull: {
      //   msg: 'User type cannot be null',
      // },
    },
    firstName: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   notEmpty: "First name cannot be empty",
      // },
      // notNull: {
      //   msg: 'First name cannot be null',
      // },
    },
    lastName: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   notEmpty: "Last name cannot be empty",
      // },
      // notNull: {
      //   msg: 'Last name cannot be null',
      // },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: "Email cannot be empty",
      },
      notNull: {
        msg: 'Email cannot be null',
      },
      isEmail: {
        msg: 'Please enter a valid email',
      },
    },
    password: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   notEmpty: "Password cannot be empty",
      // },
      // notNull: {
      //   msg: 'password cannot be null',
      // },
    },
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      // validate: {
      //   notEmpty: "Confirm password cannot be empty",
      // },
      // notNull: {
      //   msg: 'Confirm password cannot be null',
      // },
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
      // allowNull: false,
      // validate: {
      //   notEmpty: "Phone number cannot be empty",
      // },
      // notNull: {
      //   msg: 'Phone number cannot be null',
      // },
    },
    gender: {
      type: DataTypes.STRING,
      // allowNull: false,
      // validate: {
      //   notEmpty: "Gender cannot be empty",
      // },
      // notNull: {
      //   msg: 'Gender cannot be null',
      // },
    },
  },
);


User.hasMany(Project, { foreignKey: 'createdBy', });
Project.belongsTo(User, { foreignKey: 'createdBy', });

export default User;