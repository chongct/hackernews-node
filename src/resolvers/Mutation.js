const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10)
  // use Prisma binding instance
  // console.log({...args})
  const user = await context.db.mutation.createUser({
    data: {...args, password}
  }, `{ id }`)

  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  // console.log(user.id)
  // console.log(token)
  return {
    token,
    user
  }
}

async function login(parent, args, context, info) {
  // use Prisma binding instance
  const user = await context.db.query.user({ where: { email: args.email } }, `{ id password }`)
  if (!user) {
    throw new Error('No such user found')
  }

  const valid = await bcrypt.compare(args.password, user.password)
  if (!valid) {
    throw new Error('Invalid password')
  }
  console.log(user)

  const token = jwt.sign({ userId: user.id }, APP_SECRET)
  return {
    token,
    user
  }
}

function post(parent, args, context, info) {
  const userId = getUserId(context)
  console.log(userId)
  return context.db.mutation.createLink({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } }
    }
  }, info)
}

function updateLink(parent, args, context, info) {
  const userId = getUserId(context)
  return context.db.mutation.updateLink({
    data: {
      url: args.url,
      description: args.description
    }, where: {
      id: args.id
    }
  }, info)
}

function deleteLink(parent, args, context, info) {
  const userId = getUserId(context)
  return context.db.mutation.deleteLink({
    where: {
      id: args.id
    }
  }, info)
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context)
  const linkExists = await context.db.exists.Vote({
    user: { id: userId },
    link: { id: args.linkId }
  })
  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`)
  }

  return context.db.mutation.createVote({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: args.linkId } }
    }
  }, info)
}

module.exports = {
  signup,
  login,
  post,
  updateLink,
  deleteLink,
  vote
}
