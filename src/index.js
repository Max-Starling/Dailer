import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'

import App from './App';
import * as serviceWorker from './serviceWorker';
import configurateStore from './resources/store';
import './index.css';

const initialState = {};

const { store, persistor } = configurateStore(initialState);

const AppContainer = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>    
      <Router>
        <App />
      </Router>
    </PersistGate>
  </Provider>
);


ReactDOM.render(<AppContainer />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
