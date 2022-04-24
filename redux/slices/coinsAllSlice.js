//redux reducer is similar to the reducer setup in the context api
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let count = 0;

const initialState = {
  coinsAll: [],
  status: "idle",
  error: null,
};

export const fetchAllCoins = createAsyncThunk(
  "coinsAll/fetchAllCoins",
  async () => {
    const res = await axios.get(`api/assets`);
    console.log("allCoinsCount: ", (count += 1));
    return res.data.data;
  }
);

export const coinsAllSlice = createSlice({
  name: "coinsAll",
  initialState,
  reducers: {
    updateAllCoinState: (state, action) => {
      // for test
      Object.assign(state, action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllCoins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCoins.fulfilled, (state, action) => {
        state.coinsAll = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchAllCoins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { updateAllCoinState } = coinsAllSlice.actions;
export default coinsAllSlice.reducer;
