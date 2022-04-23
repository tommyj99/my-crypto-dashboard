import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  markets: [],
  coinAndExchange: {},
  coinAndExchangeStatus: false,
  isExchanges: false,
  status: "idle",
  error: "none",
};

export const fetchMarkets = createAsyncThunk(
  "markets/fetchMarkets",
  async () => {
    const res = await axios.get(`api/markets`);
    return res.data;
  }
);

export const marketsSlice = createSlice({
  name: "markets",
  initialState,
  reducers: {
    updateMarketsState: (state, action) => {
      // for test
      Object.assign(state, action.payload);
    },
    filterByUsd: (state, action) => {
      state.markets = action.payload;
    },
    saveCoinAndExchange: (state, action) => {
      state.coinAndExchange = action.payload;
      state.coinAndExchangeStatus = true;
    },
    isExchanges: (state, action) => {
      state.isExchanges = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMarkets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMarkets.fulfilled, (state, action) => {
        state.markets = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchMarkets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  filterByUsd,
  updateMarketsState,
  saveCoinAndExchange,
  isExchanges,
} = marketsSlice.actions;
export default marketsSlice.reducer;
