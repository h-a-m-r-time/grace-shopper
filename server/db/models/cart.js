const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
    amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
})

module.exports = Cart;
