
const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    operatorsAliases: 0,
    logging: true, // process.env.NODE_ENV === 'production' ? false : console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = {
    sequelize
}