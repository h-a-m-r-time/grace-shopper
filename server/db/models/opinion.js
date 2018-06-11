const Sequelize = require('sequelize')
const db = require('../db')

const Opinion = db.define('opinion', {
  statement: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING
  }
})

module.exports = Opinion
