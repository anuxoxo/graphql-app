const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const _ = require('lodash');

//dummy data
const books = [
  { name: "ABC", genre: "Fantasy", id: "1" },
  { name: "PQR", genre: "Fantasy", id: "2" },
  { name: "XYZ", genre: "Sci-Fi", id: "3" },
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db
        return _.find(books, { id: args.id })
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: RootQuery
})