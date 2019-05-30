import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from "react-apollo";
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from 'apollo-utilities';
import { onError } from 'apollo-link-error';

import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

const wsLink = new WebSocketLink({
  uri: `ws://localhost:5000/graphql`,
  options: {
    reconnect: true,
  }
});

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include', 
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  },
  wsLink,
  httpLink,
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      console.log(`[GraphQL error]: Message: ${message}, Location:`, locations);
    });
  }
  if (networkError) console.log(`[Network error]: ${networkError}`)
});

const client = new ApolloClient({
  link:  errorLink.concat(link),
  cache: new InMemoryCache({
    dataIdFromObject: object => object._id || null
  }),
});

const AppContainer = () => (
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<AppContainer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
