import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { createSchema, createYoga } from 'graphql-yoga';

export default async function (app: FastifyInstance, options, done) {
  const yoga = createYoga<{
    req: FastifyRequest;
    reply: FastifyReply;
  }>({
    schema: createSchema({
      typeDefs: /* GraphQL */ `
        type Query {
          hello: String
        }
      `,
      resolvers: {
        Query: {
          hello: () => 'Hello from Yoga!',
        },
      },
    })
  });

  app.get('/api', async (req, reply) => {
    // Second parameter adds Fastify's `req` and `reply` to the GraphQL Context
    const response = await yoga.handleNodeRequest(req, {
      req,
      reply,
    });
    response.headers.forEach((value, key) => {
      reply.header(key, value);
    });

    reply.status(response.status);

    reply.send(response.body);

    return reply;
  });

  done();
}
