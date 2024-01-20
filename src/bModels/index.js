const Sequelize = require("sequelize");
const initModels = require("./init-models");

const sequelize = new Sequelize(process.env.DB_BEECOMM_SCHEMA, process.env.DB_BEECOMM_USER, process.env.DB_BEECOMM_PASS, {
    host: process.env.DB_BEECOMM_HOST,
    port: process.env.DB_BEECOMM_PORT,
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

const db = {
    db:sequelize,
    User: initModels(sequelize),
};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.models = initModels(sequelize);

const conection = async function() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

conection()
module.exports = db;