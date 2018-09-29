const { GraphQLServer } = require('graphql-yoga')

// defines graphql schema
const typeDefs = `
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
    id: ID!
    description: String!
    url: String!
  }
`

// store links
let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}]

// actual implementation of graphql schema
const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links
  },
  Link: {
    id: (root) => root.id,
    description: (root) => root.description,
    url: (root) => root.url
  }
}

// schema and resolvers bundled and passed to graphqlserver, which is imported from graphql-yoga
// tells server what API operations are accepted and how they should be resolved
const server = new GraphQLServer({
  typeDefs,
  resolvers,
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
