module.exports = `
  type Account {
    _id: ID!
    settings: Settings!
  }

  type Settings {
    mode: String!
  }

  type Query {
    account(_id: ID!): Account
    accounts: [Account]
  }

  type Mutation {
    updateSettings (_id: ID!, mode: String) : Settings!
  }
`;
