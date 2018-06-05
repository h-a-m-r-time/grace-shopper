const Sequelize = require('sequelize')
const db = require('../db')

const Opinion = db.define('opinion', {
  name: {
    type: Sequelize.STRING,
  },
})

module.exports = Opinion
