const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

input ParameterInput{
    authors: [String]!
    description: String!
    title: String!
    bookId: String!
    image: String!
}

  type Query {
      me: User
   }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: ParameterInput): User
    removeBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;


