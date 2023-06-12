import { configureStore } from "@reduxjs/toolkit";

import callsReducer from './calls-slice';
import filtersReducer from "./filters-slice";

export const store = configureStore({
  reducer: {
    calls: callsReducer,
    filters: filtersReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch