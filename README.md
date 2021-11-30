# graphql-demo
This repository puts together a NodeJS Backend, with a React Frontend, using a local JSON database. It is intended to a playground for those who begin their GraphQL journey!

<br/>

## Backend
Simple NodeJS application intended to demonstrates a simple implementation  of a Server side GraphQL API. Server uses *Fastify* as the routing framework together with *Mercurius* as the GraphQL adapter. GraphQL Schemas can be introspected by navigating your browser to the appropriate endpoint (see Installation).
### Data
This project uses JSON database locally to read and write data synchronously. You can reset database values at any time, by using this command from the repository root folder:

`$ cp ./backend/src/data/data.backup.json ./backend/src/data/data.json`

*Please note that the date values must follow the format: `YYYY-mm-dd`*
### Installation
>Requires node 16.9

`cd backend` (from project root)

`npm install`

`npm start`

- Node application will listen on `http://localhost:3000`

- GraphiQL endpoint will be on `http://localhost:3000/graphiql`

- GraphQL runtime endpoint will be on `http://localhost:3000/graphql`

#### Debugging

Use vscode built-in Debugger and select `Debug BACKEND` configuration.

<br/>

## Frontend
Demonstrates the use of a GraphQL API (Backend) through a really basic React application. It does not use any external Graphql Client Framework, it rather uses plain HTTP POST to query its Backend. It is intended to a "bare metal" introduction to how we can consume those GraphQL queries and mutations.

### Installation
>Requires node 16.9

`cd frontend` (from project root)

`yarn install install`

`yarn start`

- Application will be hosted on `http://localhost:4000`

### Debugging

- Start the application: `npm yarn start`
- Use vscode built-in Debugger and select `Debug FRONTEND` configuration.

_You will be able to set breakpoints directly in your javascript code._

<br/>

## License

*The Unlicense*
