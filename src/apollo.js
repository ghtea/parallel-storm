import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://ahg.avantwing.com"
});

export default client;