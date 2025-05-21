import { Sequelize } from 'sequelize';

const {
  DB_HOST = 'db',
  DB_USER = 'postgres',
  DB_PASS = 'postgres',
  DB_NAME = 'contacts'
} = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'postgres',
  logging: false, // disable SQL query logging for cleaner output
});
