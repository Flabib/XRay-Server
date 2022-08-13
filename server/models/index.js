const { Sequelize, Op, Model, DataTypes } = require("sequelize")
const sequelize = new Sequelize('sqlite::memory:')

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.XRay = require('./xray.model')(sequelize, Sequelize)

module.exports = db
