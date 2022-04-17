//redux reducer is similar to the reducer setup in the context api
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  coinsAll: [],
  status: "idle",
  error: null,
};

export const fetchAllCoins = createAsyncThunk(
  "coinsAll/fetchAllCoins",
  async () => {
    const res = await axios.get(`api/assets`);
    return res.data;
  }
);

export const coinsAllSlice = createSlice({
  name: "coinsAll",
  initialState,
  reducers: {
    updateAllCoinState: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllCoins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCoins.fulfilled, (state, action) => {
        console.log("assets: ", action.payload);
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
