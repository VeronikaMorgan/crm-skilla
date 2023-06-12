import { SET_DATE, SET_PERIOD, CHOSEN_PERIOD } from "../utils/constants";
import { createSlice } from "@reduxjs/toolkit";

export type TDateSetPeriodValue = {
  from: Date
  to: Date
}
export type TDateFilter = {
  type: typeof SET_DATE | typeof SET_PERIOD | typeof CHOSEN_PERIOD
  value: Date | TDateSetPeriodValue
}
type TFilters = {
  [name: string]: string | number | typeof Date | TDateFilter
}
type TFiltersState = {
  areMainFiltersSet: boolean
  areFiltersSet: boolean
  filters: TFilters
}
const initialState = <TFiltersState>{
  areMainFiltersSet: false,
  areFiltersSet: false,
  filters: {}
}
const filtersSlice = createSlice({
  name: "song",
  initialState: initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
      const filter = Object.keys(action.payload)[0]
      console.log(filter)
      if (filter !== 'date' && 'from_number') {
        console.log('sdfg')
        state.areMainFiltersSet = true
      }
      state.areFiltersSet = true
    },
    deleteFilter: (state, action) => {
      Reflect.deleteProperty(state.filters, action.payload)
      if (Object.keys(state.filters).length === 0) {
        state.areFiltersSet = false
        state.areMainFiltersSet = false
      }
    },
    clearFilters: (state) => {
      const arr = ['date', 'from_number']
      const newState = Object.fromEntries(Object.entries(state.filters).filter(m => arr.includes(m[0])))
      state.filters = newState
      if (Object.keys(newState).length === 0) {
        state.areFiltersSet = false
        state.areMainFiltersSet = false
      } else {
        state.areMainFiltersSet = false
      }
    },
  }
})

export const { setFilter, deleteFilter, clearFilters } = filtersSlice.actions
export default filtersSlice.reducer 