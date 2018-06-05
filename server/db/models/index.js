// const db = require('../db')

const User = require('./user')
const Feeling = require('./feeling')
const Thing = require('./thing')
const Transaction = require('./transaction')
const Cart = require('./cart')
const Opinion = require('./opinion')

Feeling.belongsToMany(Thing, {through: Opinion})
Thing.belongsToMany(Feeling, {through: Opinion})

Opinion.belongsTo(Transaction)
Transaction.hasOne(Opinion)
User.belongsTo(Transaction)
Transaction.hasOne(User)

Opinion.belongsTo(Cart)
Cart.hasOne(Opinion)
User.belongsTo(Cart)
Cart.hasOne(User)

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Feeling, Thing, Transaction, Cart, Opinion
}
