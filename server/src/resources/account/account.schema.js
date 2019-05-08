module.exports = `
  type Account {
    _id: ID!
    email: String!
    settings: Settings!
  }

  type Settings {
    mode: String!
  }

  type Query {
    account(email: String!): Account
    accounts: [Account]
    check : Boolean!
  }

  type Mutation {
    signIn (idToken: String!) : String!
    signOut : String!
    updateSettings (email: String!, mode: String) : Settings!
  }
`;
