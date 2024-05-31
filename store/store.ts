import { configureStore, createStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';
import { createWrapper } from 'next-redux-wrapper';

const persistConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

const makeStore = () => {
  return store
}

export const wrapper = createWrapper(makeStore, { debug: false });

export {  store, persistor };