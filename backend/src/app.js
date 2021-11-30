import Fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import graphqlAdapter from 'mercurius';
import opsRoutes from './routes/ops.routes';
import schemas from './graphql/schemas';
import GraphQLVoyagerFastify from 'graphql-voyager-fastify-plugin';

const initialize = async () => {
  const app = Fastify();

  app.register(fastifyCors);

  app.register(opsRoutes, { prefix: '/ops' });

  app.register(graphqlAdapter, {
    schema: schemas,
    graphiql: process.env.NODE_ENV === 'development',
    routes: true,
    queryDepth: 4,
    context: (request, reply) => {
      return {
        timestamp: Date.now(),
        debug: process.env.NODE_ENV === 'debug'
      };
    }
  });

  app.register(GraphQLVoyagerFastify, {
    // url path
    path: '/voyager',
    // graphql endpoint path
    endpoint: '/graphql'
  });

  return app;
};

export const start = async () => {
  console.log(`### Environment is: ${process.env.NODE_ENV}`);
  console.log('Initializing application...');

  // Initialize fastify application
  const app = await initialize();
  await app.ready();

  console.log(`Starting server on port: ${process.env.PORT || process.argv[2] || 3000}`);
  app.listen(process.env.PORT || process.argv[2] || 3000, (err, address) => {
    if (err) {
      console.log('Error occured at application startup!', err);
      process.exit(1);
    }
    console.log(`Listening on port ${process.env.PORT || process.argv[2] || 3000}...`);
    console.log('Application ready.');
  });
};
