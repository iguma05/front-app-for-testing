import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './queries';
import { ApiState } from './selectors/api';

const reducer = combineReducers({
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(
  {
    key: 'root',
    version: 1,
    storage,
    whitelist: [],
  },
  reducer
);

export const createStore = (preloadedState: Partial<RootState>) => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: true,
        serializableCheck: false,
        thunk: {
          extraArgument: {},
        },
      }).concat(api.middleware),
    devTools: false,

    preloadedState: preloadedState as RootState,
  });
  setupListeners(store.dispatch);
  return store;
};

type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = (typeof persistedReducer extends Reducer<infer S>
  ? S
  : never) & {
  api: ApiState;
};
