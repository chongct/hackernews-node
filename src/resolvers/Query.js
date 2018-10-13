function feed(parent, args, context, info) {
  return context.db.query.links({}, info)
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
