const {DataTypes} = require("sequelize");

const XRay = (sequelize, Sequelize) => sequelize.define('XRay', {
    backtrace: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {sequelize, Sequelize})

module.exports = XRay