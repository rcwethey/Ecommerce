const { gql } = require('apollo-server')

export const typeDefs = gql`
 type User {
  id: String!,
  firstname: String!,
  lastName: String!,
  age: Number!
 }

 type Query{
  id: String!
 }

 type Mutation{
  firstName: String!
 }
`