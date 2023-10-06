import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { configureStore, history } from './redux/store/configureStore';


import App from './containers/App/App';
// import App from './App'

const store = configureStore(); // Ensure the store is initialized
const target = document.querySelector('#root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  target
);
