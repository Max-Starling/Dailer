module.exports = `
  type Task {
    _id: ID!
    title: String!
    status: String!
    frequency: Int!
    startTime: String!
  }

  type Query {
    task(_id: ID!): Task
    tasks: [Task]
  }

  type Mutation {
    createTask (title: String!, frequency: Int!) : Task!
    updateTask (_id: ID!, title: String, frequency: Int, status: String, startTime: String) : Task!
    deleteTask (_id: ID!): Task!
  }
`;
// createTask (task: CreateTaskInput!) : Task!
// input CreateTaskInput {
//   authorId: String!
//   title: String!
// }