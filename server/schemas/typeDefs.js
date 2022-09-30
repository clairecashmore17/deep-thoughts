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
    me: User
    users: [User]
    # ! means the data must exists
    user(username: String!): User
    # with the username provided, it says we COULD recieve a parameter, but dont have to!
    thoughts(username: String): [Thought]
    thought(_id: ID!): Thought
  }
  #Putting in our mutations
  type Mutation {
    #Both of these mutatios return a Auth object
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addThought(thoughtText: String!): Thought
    #Notice that this is returning a thought, front end will track through thoughts not reactions
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID): User
  }
  #Creating a new type def since token isnt a part of a User model
  type Auth {
    token: ID!
    user: User
  }
`;

//export the typeDefs
module.exports = typeDefs;
