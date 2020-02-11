import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'index.css';
import styled from 'styled-components';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import 'firebase/firestore';
import fb from 'config/fbConfig';

import App from 'containers/app';
import { rootReducer } from 'reducers/rootReducer';
import rootSaga from 'saga/rootSaga';
import * as serviceWorker from 'serviceWorker';

export const db = fb.firestore();
const saga = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(saga));
saga.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
