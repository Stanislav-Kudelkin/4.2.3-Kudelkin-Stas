import { configureStore } from '@reduxjs/toolkit'
import vacanciesReduser from './vanciesSlise'

const store = configureStore({
  reducer: {
    vacancies: vacanciesReduser,
  },
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
