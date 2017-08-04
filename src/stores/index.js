import { createStore, compose, applyMiddleware } from 'redux';
import reducers from '@reducers';
import thumbnailMiddleware from '@middlewares/thumbnail';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
function reduxStore(initialState) {
  const store = createStore(reducers, initialState, composeEnhancers(
    applyMiddleware(thumbnailMiddleware)
  ));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // We need to require for hot reloading to work properly.
      const nextReducer = require('../reducers');  // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export default reduxStore;
