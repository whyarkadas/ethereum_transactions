import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../routes/configureStore';
import {router} from '../routes/router';
import createHistory from 'history/createBrowserHistory';
import { CookiesProvider } from 'react-cookie';

const history = createHistory();
const store = configureStore(undefined, history);
class App extends Component {
  render() {
    return (
      <CookiesProvider>
        <Provider store={store}>{router}</Provider>
      </CookiesProvider>
    );
  }
}

export default App;