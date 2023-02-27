import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import docsSlice from './DocsSlice'

export const store = configureStore({
  reducer: {
      docsSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
