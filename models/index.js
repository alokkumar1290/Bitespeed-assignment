'use strict';

const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const currentFile = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configPath = path.resolve(__dirname, '..', 'config', 'config.json');
const dbConfig = require(configPath)[env];

const db = {};

const sequelize = dbConfig.use_env_variable
  ? new Sequelize(process.env[dbConfig.use_env_variable], dbConfig)
  : new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

// Load all model files dynamically except this index file
fs.readdirSync(__dirname)
  .filter(file => (
    file !== currentFile &&
    file.endsWith('.js') &&
    !file.endsWith('.test.js')
  ))
  .forEach(file => {
    const modelInit = require(path.join(__dirname, file));
    const model = modelInit(sequelize, DataTypes);
    db[model.name] = model;
  });

// Setup model associations if defined
Object.values(db).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
