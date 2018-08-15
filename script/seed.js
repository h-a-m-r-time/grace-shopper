'use strict'

const db = require('../server/db')
const {
  Feeling,
  Opinion,
  Thing,
  Transaction,
  User,
} = require('../server/db/models')

const feelings = [
  {
    name: 'love',
    category: 'verb'
  },
  {
    name: 'are suspicious',
    category: 'description'
  },
  {
    name: 'are ugly',
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
    category: 'verb',
    feelingId: 1,
    thingId: 1,
  }, {
    statement: 'bears are suspious.',
    category: 'description',
    feelingId: 2,
    thingId: 2,
  }, {
    statement: 'pugs are ugly.',
    category: 'description',
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
    purchased: true
  },
  {
    amount: 6.66,
    purchased: true
  },
  {
    amount: 0.0,
    purchased: true
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
    createdTransactions[0].setOpinion(createdOpinions[0]),
    createdTransactions[1].setOpinion(createdOpinions[1]),
    createdTransactions[2].setOpinion(createdOpinions[2]),
    createdTransactions[3].setOpinion(createdOpinions[2]),
    createdTransactions[4].setOpinion(createdOpinions[2]),
    createdTransactions[5].setOpinion(createdOpinions[2]),
  ])

  await Promise.all([
    createdFeelings,
    createdOpinions,
    createdThings,
    createdTransactions,
    createdUsers,
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${transactions.length} transactions`)
  console.log(`seeded successfully`)
}

if (module === require.main) {
  seed()
    .catch(err => {
      console.error(err)
      process.exitCode = 1
    })
    .finally(() => {
      console.log('closing db connection')
      db.close()
      console.log('db connection closed')
    })
  console.log('seeding...')
}

module.exports = seed
