import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

if (!process.env.PG_DB) {
  const envConfig = dotenv.parse(fs.readFileSync(path.resolve(__dirname, '../../deploy/.env')));

  for (let k in envConfig) {
    process.env[k] = envConfig[k];
  }

  console.log('[api][sequelize] Loaded database ENV vars from .env file');
}

module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_meta',
  },
  staging: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_meta',
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    migrationStorageTableName: 'sequelize_meta',
  },
};
