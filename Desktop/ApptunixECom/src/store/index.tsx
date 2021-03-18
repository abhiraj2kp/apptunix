import rootReducer from '../reducer';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {persistStore, persistReducer, PersistConfig} from 'redux-persist';

const enhancers = [
  applyMiddleware(
    thunkMiddleware,
    createLogger({
      collapsed: true,
    }),
  ),
];

const enhancer = compose(...enhancers);

//@ts-ignore
const persistConfig: PersistConfig = {
  key: 'root',
  whitelist: [],
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
//@ts-ignore
export const store = createStore(persistedReducer, {}, enhancer);
export const persistor = persistStore(store);
