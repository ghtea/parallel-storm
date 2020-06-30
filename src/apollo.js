import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://api-hots.avantwing.com"
});

export default client;