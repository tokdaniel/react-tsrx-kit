import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore, DeepPartial } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { createEpicMiddleware } from 'redux-observable';

import createRootReducer from '../reducers'
import rootEpic from '../epics';

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = (
  'development' === process.env.NODE_ENV &&
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose;

export const history = createBrowserHistory();

export default (preLoadedState = {}) => {
  const store = createStore(
    createRootReducer(history),
    preLoadedState,
    composeEnhancers(
      applyMiddleware(
        epicMiddleware,
        routerMiddleware(history),
      ),
    ),
  );
  epicMiddleware.run(rootEpic);

  return store;
}



