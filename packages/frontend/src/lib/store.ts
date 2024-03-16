import { configureStore } from '@reduxjs/toolkit';

export const store = () => {
  return configureStore({
    reducer: {}
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
