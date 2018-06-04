const Sequelize = require('sequelize')
const db = require('../db')

const Thing = db.define('thing', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.TEXT
  }
})

module.exports = Thing
