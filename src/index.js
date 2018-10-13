const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayload')
const Subscription = require('./resolvers/Subscription')

// defines graphql schema (refactor)
// const typeDefs = `
//   type Query {
//     info: String!
//     feed: [Link!]!
//   }
//    type Link {
//     id: ID!
//     description: String!
//     url: String!
//   }
// `

// store links
// let links = [{
//   id: 'link-0',
//   url: 'www.howtographql.com',
//   description: 'Fullstack tutorial for GraphQL'
// }]
//
// let idCount = links.length

// actual implementation of graphql schema
// const resolvers = {
//   Query: {
//     info: () => `This is the API of a Hackernews Clone`,
//     feed: (root, args, context, info) => {
//       // return links
//       return context.db.query.links({}, info)
//     },
//     link: (root, args) => {
//       let match = {}
//       links.forEach(function(element) {
//         if (args.id === element.id) {
//           match = element
//         }
//       })
//       // console.log(match)
//       return match
//     }
//   },
//   Mutation: {
//     post: (root, args, context, info) => {
//       // const link = {
//       //   id: `link-${idCount++}`,
//       //   description: args.description,
//       //   url: args.url
//       // }
//       // links.push(link)
//       // return link
//
//       return context.db.mutation.createLink({
//         data: {
//           url: args.url,
//           description: args.description
//         }
//       }, info)
//     },
//     updateLink: (root, args) => {
//       let match = {}
//       links.forEach(function(element) {
//         if (args.id === element.id) {
//           match["id"] = element.id
//           match["url"] = args.url
//           match["description"] = args.description
//         }
//       })
//       links.splice(match.id.split("-")[1], 1, match)
//       // console.log(links)
//       return match
//     },
//     deleteLink: (root, args) => {
//       var deleteIndex
//       let match = {}
//       links.forEach(function(element, index) {
//         if (args.id === element.id) {
//           deleteIndex = index
//         }
//       })
//       match = links[deleteIndex]
//       links.splice(deleteIndex, 1)
//       console.log(links)
//       return match
//     }
//   },
//   // Link resolver optional
//   Link: {
//     id: (root) => root.id,
//     description: (root) => root.description,
//     url: (root) => root.url
//   }
// }

const resolvers = {
  Query,
  Mutation,
  AuthPayload,
  Subscription
}

// schema and resolvers bundled and passed to graphqlserver, which is imported from graphql-yoga
// tells server what API operations are accepted and how they should be resolved
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466',
      secret: 'mysecret123',
      debug: true
    })
  })
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
