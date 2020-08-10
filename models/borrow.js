'use strict';
let Sequelize = require("sequelize");
let sequelize = require("../config/databaseConn");
let {Book} = require("./book");
let {Borrower} = require("./borrower");

let Borrow = sequelize.define("borrows", {
  card_number: Sequelize.STRING,
  book_code: Sequelize.STRING,
  borrow_date: Sequelize.DATE,
  pay_date: Sequelize.DATE,
}, {
  tableName: "borrows",
  createdAt: "created_at",
  updatedAt: "updated_at",
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
});
Borrow.associate = function(models) {
  Borrow.belongsTo(models.Borrower, {foreignKey: 'card_number'})
  Borrow.belongsTo(models.Book, {foreignKey: 'book_code'})
};

module.exports = {
  Borrow,
};