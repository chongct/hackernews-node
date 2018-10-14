// links field from Feed type in schema.graphql actually gets resolved here
function links(parent, args, context, info) {
  return context.db.query.links({ where: { id_in: parent.linkIds } }, info)
}

module.exports = {
  links
}
