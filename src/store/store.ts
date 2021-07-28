import {applyMiddleware, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {rootReducer} from './rootReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [thunk];

export const store = createStore(
  persistedReducer,
  undefined,
  applyMiddleware(...middlewares)
);

export const persistor = persistStore(store);
//persistor.purge();
