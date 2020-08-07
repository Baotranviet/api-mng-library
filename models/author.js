'use strict';

let Sequelize = require("sequelize");
let sequelize = require("../config/databaseConn");

let Author = sequelize.define("authors", {
  name: Sequelize.STRING,
}, {
  tableName: "authors",
  createdAt: "created_at",
  updatedAt: "updated_at",
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
});

module.exports = {
  Author,
};