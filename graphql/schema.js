const { buildSchema } = require('graphql')

module.exports = buildSchema(`
  type User {
    id: ID!
    email: String!
  }

  input UserInputData {
    email: String!
    password: String!
  }

  type Todo {
    id: ID!
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
    loginUser(userInput: UserInputData!): String!
    me: Boolean!
    todos: [Todo!]!
    todo(id: ID!): Todo!
    user(id: ID!): User!
  }

  type Mutation {
    createUser(userInput: UserInputData!): User!
    createTodo(todoInput: TodoInputData!): Todo!
    updateTodo(id: ID!, todoInput: TodoInputData): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`)