import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  ohlc: [],
  status: "idle",
  error: null,
};

export const fetchOhlcData = createAsyncThunk(
  "ohlc/fetchOhlcData",
  async (chartInputObj) => {
    const { coin, startTime, endTime, period, exchange } = chartInputObj;
    console.log("periodOhlc: ", period);
    const res = await axios.get(
      `api/ohlc?coin=${coin}&starttime=${startTime}&endtime=${endTime}&period=${period}&exchange=${exchange}`
      //`/markets/${exchange}/${coin}/ohlc?before=${endTime}&after=${startTime}&periods=${period}`
    );
    return res.data.data.result;
  }
);

export const ohlcSlice = createSlice({
  name: "ohlc",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOhlcData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOhlcData.fulfilled, (state, action) => {
        state.ohlc = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOhlcData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ohlcSlice.reducer;
