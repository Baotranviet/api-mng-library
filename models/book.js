'use strict';
let Sequelize = require("sequelize");
let sequelize = require("../config/databaseConn");
let {Borrow} = require("./borrow");
let {Author} = require("./author");

let Book = sequelize.define("books", {
  book_code: Sequelize.STRING,
  book_name: Sequelize.STRING,
  page_number: Sequelize.INTEGER,
  quantity: Sequelize.INTEGER,
  author_id: Sequelize.INTEGER,
}, {
  tableName: "books",
  createdAt: "created_at",
  updatedAt: "updated_at",
  charset: 'utf8',
  collate: 'utf8_unicode_ci',
});
Book.associate = function() {
  Book.hasMany(Borrow, {as: 'borrows'});
  Book.belongsTo(Author, {foreignKey: 'author_id', as: 'author'})
};

module.exports = {
  Book,
};