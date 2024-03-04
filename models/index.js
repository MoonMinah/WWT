"use strict";

const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.json")["development"];

console.log("config >> ", config);
const db = {};

// Sequelize를 이용하여 sequelize 인스턴스를 생성
const sequelize = new Sequelize(config.database, config.username, config.password, config);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./User")(sequelize, Sequelize);

module.exports = db;