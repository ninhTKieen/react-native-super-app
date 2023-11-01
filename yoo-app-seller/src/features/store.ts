import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from '@/features/auth/auth.slice';
import storeReducer from '@/features/store/store.slice';
import chatReducer from '@/features/chat/chat.slice';
import createItemReducer from '@/features/item/item.slice';
import settingReducer from '@/features/profile/profile.slice';
import orderReducer from '@/features/order/order.slice';
import {persistStore, persistReducer, PersistConfig} from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reactotron from 'reactotronConfig';

const persistConfig: PersistConfig<any> = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['chat'],
  timeout: 30000,
};

const rootReducer = combineReducers({
  auth: authReducer,
  store: storeReducer,
  chat: chatReducer,
  createItem: createItemReducer,
  setting: settingReducer,
  order: orderReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false,
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      //   ignoredPaths: ['chat.hubSignalR'],
      // },
      serializableCheck: false,
      immutableCheck: false,
    }),
  enhancers: [reactotron.createEnhancer!()],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
