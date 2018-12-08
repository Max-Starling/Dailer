import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducer';

const configureStore = (initialState) => {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk),
  );

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer').default; // eslint-disable-line
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;
