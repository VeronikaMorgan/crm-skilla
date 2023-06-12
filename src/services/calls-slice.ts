import { baseRequest, baseOptions, baseUrl } from "../utils/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const getCalls = createAsyncThunk('calls/get', async () => {
  const data = await axios.post(baseUrl, null, baseOptions())
    .then(res => res.data.results)
    .catch(error => console.log(error))
  console.log(data)
  return data
})

interface IcallsSliceState {
  getCallsRequest: boolean,
  getCallsFailed: boolean,
  calls: any[] | null
}

const callsSliceState:IcallsSliceState = {
  getCallsRequest: false,
  getCallsFailed: false,
  calls: null
}

const callsSlice = createSlice({
  name: 'calls',
  initialState: callsSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCalls.pending, state => ({ ...state, getCallsRequest: true }))
    builder.addCase(getCalls.fulfilled, (state, action: PayloadAction<any[]>) => ({
      ...state,
      getCallsRequest: false,
      getCallsFailed: false,
      calls: action.payload
    }))
    builder.addCase(getCalls.rejected, state => ({
      ...state,
      getCallsFailed: true,
      getCallsRequest: false
    }))
  }
})

export default callsSlice.reducer