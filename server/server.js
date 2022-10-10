const express = require("express");
const path = require("path");
//import ApolloServer
const { ApolloServer } = require("apollo-server-express");
//importing our authentication middleware
const { authMiddleware } = require("./utils/auth");
//import our typedefs and resolvers
const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // passing in contact set to return what you want available in the resolvers
  // This will ensures every request performs an authentication check
  context: authMiddleware,
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create a new instance of an Apollo server with teh GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  //intergrater our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  //Serve up static assets
  // is the node environment in production?
  if (process.env.NODE_ENV === "production") {
    // tell express to serve any files in react applications build directory in the client folder
    app.use(express.static(path.join(__dirname, "..client/build")));
  }
  // Wildcard GET route for the server, if we make GET to location on server that doesnt have explicit route define, respond with production-ready rect front end code
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      //log where we can go to test our GQL API
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

//Call the async function to start the server
startApolloServer(typeDefs, resolvers);
