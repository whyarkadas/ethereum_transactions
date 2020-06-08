import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import {router} from './router';
//import createHistory from 'history/createBrowserHistory';
import { CookiesProvider } from 'react-cookie';

//const history = createHistory();
const store = configureStore(undefined, history);
ReactDOM.render(<CookiesProvider>
    <Provider store={store}>{router}</Provider>
</CookiesProvider>, document.getElementById('root'));