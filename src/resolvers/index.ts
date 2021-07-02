import UserResolver from './uSerResolver'

export const Resolvers = {
 Query: {
  ...UserResolver.Query
 },
 Mutation: {
  ...UserResolver.Mutation
 }
}