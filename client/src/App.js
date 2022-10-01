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

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import SingleThought from "./pages/SingleThought";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

// Where is the backend server?
const httpLink = createHttpLink({
  //react works on 3000, so we need to specify we are running on port 3001, cant just put /graphql endpoint
  uri: "/graphql",
});

//we can use this as middleare to retrieve token and combine with existing httpLink
const authLink = setContext((_, { headers }) => {
  //retrieve the token
  const token = localStorage.getItem("id_token");
  return {
    //set the http request headers to include the found token
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// connect to our GraphQL API server
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    // wrap with this because we are passing the client variable as the calue for the client prop in provider. Everything past this <> will have to access the client servers api data
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/thought" element={<SingleThought />} />
              <Route path="*" element={<NoMatch />} />
              <Route path="/profile">
                <Route path=":username" element={<Profile />} />
                <Route path="" element={<Profile />} />
              </Route>
              <Route path="/thought/:id" element={<SingleThought />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
