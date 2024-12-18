'use strict';

import { QueryInterface, Sequelize } from 'sequelize';

export const up = async (queryInterface) => {
  await queryInterface.addColumn('users', 'gender', {
    type: Sequelize.STRING,
    allowNull: true,
  });
};

export const down = async (queryInterface) => {
  await queryInterface.removeColumn('users', 'gender');
};
