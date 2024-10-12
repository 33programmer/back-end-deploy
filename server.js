const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Define a simple GraphQL schema
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

// Define a resolver for the schema
const root = {
  hello: () => 'Hello, GraphQL!',
};

// Create an Express server and a GraphQL endpoint
const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true, // Enables the GraphiQL UI
}));

// Start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`GraphQL server is running on http://localhost:${port}/graphql`);
});

