let Sequelize = require('sequelize');

let sequelize = new Sequelize("database", "username", "password", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = sequelize;