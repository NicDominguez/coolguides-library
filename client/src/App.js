import React from "react";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import GuideList from "./components/GuideList";
import AddGuide from "./components/AddGuide";
import SearchBar from "./components/SearchBar";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>r/coolguides Library</h1>
        <SearchBar />
        <GuideList />
        <AddGuide />
      </div>
    </ApolloProvider>
  );
}

export default App;
