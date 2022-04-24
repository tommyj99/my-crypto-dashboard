import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let count = 0;

const initialState = {
  ohlcModifiable: [],
  status: "idle",
  error: null,
};

export const fetchOhlcModifiableData = createAsyncThunk(
  "ohlcModifiable/fetchOhlcDataModifiable",
  async (chartInputModObj) => {
    const { coin, startTime, endTime, period, exchange } = chartInputModObj;
    const res = await axios.get(
      `api/ohlcmod?coin=${coin}&starttime=${startTime}&endtime=${endTime}&period=${period}&exchange=${exchange}`
      // `/markets/${exchange}/${coin}/ohlc?before=${endTime}&after=${startTime}&periods=${period}`
    );
    console.log("ohlcModCount: ", (count += 1));
    return res.data.data.result;
  }
);

export const ohlcModifiableSlice = createSlice({
  name: "ohlcModifiable",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOhlcModifiableData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOhlcModifiableData.fulfilled, (state, action) => {
        state.ohlcModifiable = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOhlcModifiableData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ohlcModifiableSlice.reducer;
