'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('borrows', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      card_number: {
        type: Sequelize.STRING,
        allowNull: false
      },
      book_code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      borrow_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      pay_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3)")
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)"),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('borrows');
  }
};