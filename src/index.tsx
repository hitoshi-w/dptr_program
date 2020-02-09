import React from 'react';
import ReactDOM from 'react-dom';
import 'index.css';

import 'firebase/firestore';
import fb from 'config/fbConfig';

import App from 'App';
import * as serviceWorker from 'serviceWorker';

export const db = fb.firestore();
ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
