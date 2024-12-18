'use strict';
import { DataTypes } from 'sequelize';

import sequelize from '../config/database.js';
import AppError from '../utils/appError.js';

const Project = sequelize.define(
  'projects',
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Title cannot be null',
        },
        notEmpty: {
          msg: 'Title cannot be empty',
        },
      },
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
      validate: {
        isIn: {
          args: [[true, false]],
          msg: 'Id featured value must be true or false',
        },
      },
    },
    productImage: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'ProductImage cannot be null',
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Price cannot be null',
        },
        isDecimal: {
          msg: 'Price value must be in decimal',
        },
      },
    },
    shortDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'ShortDescription cannot be null',
        },
        notEmpty: {
          msg: 'ShortDescription cannot be empty',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Description cannot be null',
        },
        notEmpty: {
          msg: 'Description cannot be empty',
        },
      },
    },
    productUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'ProductUrl cannot be null',
        },
        notEmpty: {
          msg: 'ProductUrl cannot be empty',
        },
        isUrl: {
          msg: 'Invalid productUrl string',
        },
      },
    },
    category: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Category cannot be null',
        },
      },
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Tags cannot be null',
        },
      },
    },
    createdBy: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
);

export default Project;