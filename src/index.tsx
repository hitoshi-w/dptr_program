import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import CssBaseline from '@material-ui/core/CssBaseline';
import styled from 'styled-components';
import 'index.css';

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

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1200px;
  min-width: 960px;
  width: 100%;
  height: 100vh;
  margin: 0 100px;
`;

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <AppContainer>
      <App />
    </AppContainer>
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
