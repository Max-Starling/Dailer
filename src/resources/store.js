import { createStore, applyMiddleware, compose  } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducer';


const configureStore = (initialState, customReducer = rootReducer) => {
  const store = createStore(
    customReducer,
    initialState,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__({ name: 'Correct' }) : noop => noop,
    ),
  );

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer').default; // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default (initialState) => {
  const store = configureStore(initialState);
  return ({
    store,
  })
};
