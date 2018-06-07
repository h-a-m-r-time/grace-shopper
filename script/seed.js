'use strict'

const db = require('../server/db')
const {
  Feeling,
  Opinion,
  Thing,
  Transaction,
  User,
} = require('../server/db/models')

/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */

const feelings = [
  {
    name: 'love',
    category: 'verb'
  },
  {
    name: 'suspicious',
    category: 'description'
  },
  {
    name: 'really sucks',
    category: 'description'
  },
  {
    name: 'don\'t mind',
    category: 'verb',
  }
]

const opinions = [
  {
    statement: 'I love cake.',
    feelingId: 1,
    thingId: 1,
  }, {
    statement: 'I am suspicious of bears.',
    feelingId: 2,
    thingId: 2,
  }, {
    statement: 'Pugs really suck.',
    feelingId: 3,
    thingId: 3,
  }
]

const things = [
  {
    name: 'cake',
    description: 'dessert',
  },
  {
    name: 'bears',
    description: 'large and hungry',
  },
  {
    name: 'pugs',
    description: 'small dog breed',
  },
]

const transactions = [
  {
    amount: 7.77,
  },
  {
    amount: 6.66,
  },
  {
    amount: 0.0,
  },
  {
    amount: 8.77,
    purchased: true
  },
  {
    amount: 2.66,
    purchased: true
  },
  {
    amount: 0.0,
    purchased: true
  },
]

const users = [
  {
    email: 'cody@email.com',
    password: '123'
  },
  {
    email: 'murphy@email.com',
    password: '456'
  },
  {
    email: 'bobo@email.com',
    password: '789'
  },
]

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const createdFeelings = await Feeling.bulkCreate(feelings, {
    returning: true,
  })
  const createdThings = await Thing.bulkCreate(things, { returning: true })
  const createdUsers = await User.bulkCreate(users, { returning: true })
  const createdTransactions = await Transaction.bulkCreate(transactions, {
    returning: true,
  })
  const createdOpinions = await Opinion.bulkCreate(opinions, { returning: true })

  await Promise.all([
    createdTransactions[0].setUser(createdUsers[0]),
    createdTransactions[1].setUser(createdUsers[1]),
    createdTransactions[2].setUser(createdUsers[2]),
    createdTransactions[3].setUser(createdUsers[0]),
    createdTransactions[4].setUser(createdUsers[0]),
    createdTransactions[5].setUser(createdUsers[0]),
  ])

  await Promise.all([
    createdOpinions[0].setTransaction(createdTransactions[0]),
    createdOpinions[1].setTransaction(createdTransactions[1]),
    createdOpinions[2].setTransaction(createdTransactions[2]),
  ])

  await Promise.all([
    createdFeelings,
    createdOpinions,
    createdThings,
    createdTransactions,
    createdUsers,
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${transactions.length} transactions`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  seed()
    .catch(err => {
      console.error(err)
      process.exitCode = 1
    })
    .finally(() => {
      // `finally` is like then + catch. It runs no matter what.
      console.log('closing db connection')
      db.close()
      console.log('db connection closed')
    })
  /*
   * note: everything outside of the async function is totally synchronous
   * The console.log below will occur before any of the logs that occur inside
   * of the async function
   */
  console.log('seeding...')
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
