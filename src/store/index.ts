import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import rootReducer from './rootReducer'

const isDev = process.env.NODE_ENV !== 'production'

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([logger]),
  devTools: isDev,
  enhancers: []
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
