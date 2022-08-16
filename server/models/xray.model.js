const {DataTypes} = require("sequelize");

const XRay = (sequelize, Sequelize) => sequelize.define('XRay', {
    origin: {
        type: DataTypes.JSON,
        allowNull: false
    },
    content: {
        type: DataTypes.JSON,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {sequelize, Sequelize})

module.exports = XRay