module.exports = `
  type Message {
    _id: ID!
    time: String!
    text: String!
    sender: String!
  }

  type Query {
    messages: [Message]
  }

  type Mutation {
    createMessage (text: String!) : Message
  }

  type Subscription {
    messageAdded: Message
  }
`;
