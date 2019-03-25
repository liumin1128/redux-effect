import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reduxReduers, reduxEffects } from 'redux-effect';

export const sleep = (timer = 1000) => new Promise(resolve => setTimeout(resolve, timer));

const text = {
  namespace: 'text',
  state: {
    text: 'hi，redux-effect！',
   },
  reducers: {
    save: (state, { payload }) => ({ ...state, ...payload }),
    clear: () => ({}),
  },
  effects: {
    fetch: async ({ getState, dispatch }, { payload }) => {
      await dispatch({ type: 'text/save', payload: { text: '你点击了按钮，三秒后更新。请查看控制台，redux DevTools' } });
      await sleep(3000);
      await dispatch({ type: 'text/save', payload: { text: '更新了，再过三秒清空，最终恢复' } });
      await sleep(3000);
      await dispatch({ type: 'text/clear' });
      await sleep(3000);
      await dispatch({ type: 'text/save', payload: { text: 'hi，redux-effect！' } });
    },
  },
};

const counter = {
  namespace: 'counter',
  state: {
    number: 0
   },
  reducers: {
    add: (state, { payload }) => ({ ...state, number: state.number + 1 }),
    reduce: (state, { payload }) => ({ ...state, number: state.number - 1 }),
    save: (state, { payload }) => ({ ...state, ...payload }),
  },
};

const models = [ text, counter ];

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
