import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import 'firebase/firestore';
import fb from 'config/fbConfig';

import App from 'App';
import { rootReducer } from 'reducers/rootReducer';
// import rootSaga from 'saga/rootSaga';
import * as serviceWorker from 'serviceWorker';

export const db = fb.firestore();
const saga = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(saga));
// saga.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
