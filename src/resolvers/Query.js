async function feed(parent, args, context, info) {
  const where = args.filter
  ? {
    OR: [
      { url_contains: args.filter },
      { description_contains: args.filter }
    ]
  }
  : {}
  const queriedLinks = await context.db.query.links({
    where, skip: args.skip, first: args.first, orderBy: args.orderBy
  }, ` { id }` )

  // use Prisma binding instance to retrieve total number of Link elements
  const countSelectionSet = `
    {
      aggregate {
        count
      }
    }
  `
  const linksConnection = await context.db.query.linksConnection({}, countSelectionSet)

  // linkIds referenced to in Feed.js, passed to resolver in Feed.js
  return {
    count: linksConnection.aggregate.count,
    linkIds: queriedLinks.map(link => link.id)
  }
}

function info() {
  return `This is the API of a Hackernews Clone`
}

function link(parent, args, context, info) {
  return context.db.query.link({
    where: {
      id: args.id
    }
  }, info)
}

module.exports = {
  feed,
  info,
  link
}
