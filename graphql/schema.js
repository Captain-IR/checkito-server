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
    createdAt: String
    updatedAt: String
  }

  input TodoInputData {
    title: String
    completed: Boolean
    dueDate: String
    dueTime: String
  }

  type Query {
    todos: [Todo!]!
    todo(id: ID!): Todo!
    user(id: ID!): User!
  }

  type Mutation {
    createTodo(todoInput: TodoInputData!): Todo!
    updateTodo(id: ID!, todoInput: TodoInputData): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`)