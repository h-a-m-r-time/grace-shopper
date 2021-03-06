const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  amount: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  purchased: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Transaction
