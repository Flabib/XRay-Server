const { Sequelize } = require('sequelize');
const model = require('./xray.model');

const sequelize = new Sequelize('sqlite::memory:');

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    XRay: model(sequelize, Sequelize),
};