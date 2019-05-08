module.exports = `
  type Task {
    _id: ID!
    title: String!
    user: String!
    createdOn: String!
  }

  type Query {
    task(_id: ID!): Task
    tasks: [Task]
  }

  type Mutation {
    createTask (title: String!) : Task!
    updateTask (_id: ID!, title: String) : Task!
    deleteTask (_id: ID!): Task!
  }
`;
// createTask (task: CreateTaskInput!) : Task!
// input CreateTaskInput {
//   authorId: String!
//   title: String!
// }