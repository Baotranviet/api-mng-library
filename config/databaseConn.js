let Sequelize = require('sequelize');

let sequelize = new Sequelize("api-mng-library", "root", null, {
    host: "localhost",
    dialect: "mysql"
});

module.exports = sequelize;