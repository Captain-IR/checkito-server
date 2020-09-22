const { buildSchema } = require('graphql')

module.exports = buildSchema(`
  type User {
    id: Int!
    username: String!
    password: String!
  }

  type Todo {
    id: Int!
    title: String!
    completed: Boolean!
    dueDate: String
    dueTime: String
  }

  input TodoInputData {
    title: String!
    completed: Boolean
    dueDate: String
    dueTime: String
  }

  type Query {
    todo: Todo
    user: User
  }

  type Mutation {
    createTodo(todoInput: TodoInputData!): Todo!
  }
`)
