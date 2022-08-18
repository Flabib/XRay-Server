const {DataTypes} = require("sequelize");

const XRay = (sequelize, Sequelize) => sequelize.define('XRay', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
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