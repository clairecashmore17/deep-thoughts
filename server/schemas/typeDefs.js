//import the gql tagged template function
const { gql } = require("apollo-server-express");

//create our typeDefs
const typeDefs = gql`
  # creating Thought type
  type Thought {
    _id: ID
    thoughtText: String
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }
  type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }
  type User {
    _id: ID
    username: String
    email: String
    friendCount: Int
    thoughts: [Thought]
    friends: [User]
  }
  type Query {
    users: [User]
    # ! means the data must exists
    user(username: String!): User
    # with the username provided, it says we COULD recieve a parameter, but dont have to!
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }
`;

//export the typeDefs
module.exports = typeDefs;
