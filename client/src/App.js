import React from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

// Where is the backend server?
const httpLink = createHttpLink({
  //react works on 3000, so we need to specify we are running on port 3001, cant just put /graphql endpoint
  uri: "/graphql",
});

// connect to our GraphQL API server
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    // wrap with this because we are passing the client variable as the calue for the client prop in provider. Everything past this <> will have to access the client servers api data
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        <Header />
        <div className="container">
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
