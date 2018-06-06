// const db = require('../db')

const User = require('./user')
const Feeling = require('./feeling')
const Thing = require('./thing')
const Transaction = require('./transaction')
const Opinion = require('./opinion')

Opinion.belongsTo(Feeling)
Feeling.hasMany(Opinion)

Opinion.belongsTo(Thing)
Thing.hasMany(Opinion)

Opinion.belongsTo(Transaction)
Transaction.hasMany(Opinion)

Transaction.belongsTo(User)
User.hasMany(Transaction)

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
  User, Feeling, Thing, Transaction, Opinion
}
