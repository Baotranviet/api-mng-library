'use strict';
let Sequelize = require("sequelize");
let sequelize = require("../config/databaseConn");
let {Borrow} = require("./borrow");

let Borrower = sequelize.define("borrowers", {
  card_number: Sequelize.STRING,
  name: Sequelize.STRING,
  day_of_birth: Sequelize.DATE,
  class: Sequelize.STRING,
}, {
  tableName: "borrowers",
  createdAt: "created_at",
  updatedAt: "updated_at",
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
});
Borrower.associate = function() {
  Book.hasMany(Borrow, {as: 'borrows'});
};

module.exports = {
  Borrower,
};