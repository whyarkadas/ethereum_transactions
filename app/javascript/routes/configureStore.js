import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { routerMiddleware } from 'react-router-redux';

const configureStore = (prelodedState, history) => {
  const middlewares = [thunk, routerMiddleware(history)];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(createLogger());
  }

  const composed = [applyMiddleware(...middlewares)];

  // development modda inspect element icerisine redux sekmesinin cikmasi icin:
  if (process.env.NODE_ENV === 'development') {
    /* eslint-disable */
    const devExtension =
      window._REDUX_DEVTOOLS_EXTENSION_ && window._REDUX_DEVTOOLS_EXTENSION_();
    /* eslint-enable */
    if (devExtension) {
      composed.push(devExtension);
    }
  }

  const store = createStore(rootReducer, prelodedState, compose(...composed));

  return store;
};

export default configureStore;