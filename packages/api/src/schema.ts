import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    username: String!
    token: String
  }

  type Query {
    welcomeMessage: String
    checkAuth(token: String!): String
  }

  type Mutation {
    createUser(username: String!, password: String!): String
    login(username: String!, password: String!): User
    logout: String
  }
`;
