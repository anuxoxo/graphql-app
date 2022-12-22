const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = require('graphql');
const _ = require('lodash');

//dummy data
const books = [
  { name: "ABC", genre: "Fantasy", id: "1", authorId: "1" },
  { name: "PQR", genre: "Fantasy", id: "2", authorId: "2" },
  { name: "XYZ", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "SCF", genre: "Sci-Fi", id: "3", authorId: "3" },
  { name: "FHV", genre: "Sci-Fi", id: "3", authorId: "3" },
]
const authors = [
  { name: "John", age: 22, id: "1" },
  { name: "Bella", age: 42, id: "2" },
  { name: "Kits", age: 25, id: "3" },
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId })
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id })
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db
        return _.find(books, { id: args.id })
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db
        return _.find(authors, { id: args.id })
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query: RootQuery
})