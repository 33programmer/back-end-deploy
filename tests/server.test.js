const request = require('supertest');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Setup your server
const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => 'Hello, GraphQL!',
};

const app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: false, // GraphiQL not needed for tests
}));

test('responds with Hello, GraphQL!', async () => {
  await request(app)
    .post('/graphql')
    .send({ query: '{ hello }' })
    .expect(200)
    .then((response) => {
      expect(response.body.data.hello).toBe('Hello, GraphQL!');
    });
});

