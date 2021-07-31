import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    email: String!
    first_name: String!
    last_name: String!
    created_at: Timestamp!
    updated_at: Timestamp!
  }

  input CreateAccountDTO {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    passwordConfirm: String!
  }

  input LoginDTO {
    email: String!
    password: String!
  }

  type Query {
    login(user: LoginDTO!): User!
  }

  type Mutation {
    createAccount(newUser: CreateAccountDTO!): User!
  }
`;
