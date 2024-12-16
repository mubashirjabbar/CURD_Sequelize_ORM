import { Sequelize } from 'sequelize';
import config from './config.js'; // Import configuration file

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

// Test the connection
sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err));

export default sequelize;
