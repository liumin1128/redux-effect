import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reduxReduers, reduxEffects } from 'redux-effect';

export const sleep = (timer = 1000) => new Promise(resolve => setTimeout(resolve, timer));

const test = {
  namespace: 'test',
  state: { text: 'hi!' },
  reducers: {
    save: (state, { payload }) => ({ ...state, ...payload }),
    clear: () => ({}),
  },
  effects: {
    fetch: async ({ getState, dispatch }, { payload }) => {
      await sleep(3000);
      await dispatch({ type: 'test/clear' });
      await sleep(3000);
      await dispatch({ type: 'test/save', payload: { text: 'hello world' } });
    },
  },
};

const models = [ test ];

const reducers = combineReducers(reduxReduers(models));
const middlewares = [ reduxEffects(models) ];

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

export function configureStore(initialState = {}) {
  const store = createStore(
    reducers,
    initialState,
    bindMiddleware(middlewares),
  );
  return store;
}
