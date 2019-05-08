module.exports = `
  type Repeatable {
    _id: ID!
    title: String!
    status: String!
    frequency: Int!
    startTime: String!
    user: String!
  }

  type Query {
    repeatable(_id: ID!): Repeatable
    repeatables: [Repeatable]
  }

  type Mutation {
    createRepeatable (title: String!, frequency: Int!) : Repeatable!
    updateRepeatable (_id: ID!, title: String, frequency: Int, status: String, startTime: String) : Repeatable!
    deleteRepeatable (_id: ID!): Repeatable!
  }
`;
