import { buildApp } from './app/app';
import { PORT, HOST } from './app/consts';

const app = buildApp(true);

app
  .listen({
    port: PORT,
    host: HOST,
  })
  .then((serverUrl) => {
    app.log.info(`GraphQL API located at ${serverUrl}/graphql`);
  })
  .catch((err) => {
    app.log.error(err);
    process.exit(1);
  });
