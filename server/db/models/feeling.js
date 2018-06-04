const Sequelize = require('sequelize')
const db = require('../db')

const Feeling = db.define('feeling', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Feeling;

