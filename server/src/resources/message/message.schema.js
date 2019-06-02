module.exports = `
  type Message {
    _id: ID!
    time: String!
    text: String!
    sender: String!
    receiver: String!
  }

  type Query {
    messages: [Message]
  }

  type Mutation {
    createMessage (receiver: String!, text: String!) : Message
  }

  type Subscription {
    messageAdded: Message
  }
`;
