import { createSlice } from "@reduxjs/toolkit";

export const buildChartLastCandleSlice = createSlice({
  name: "buildChartLastCandle",
  initialState: {
    chartObjLastCandle: {},
    status: "idle",
    error: "none",
  },
  reducers: {
    buildChartLastCandle: (state, action) => {
      Object.assign(state, action.payload);
      state.status = "succeeded";
    },
  },
});

export const { buildChartLastCandle } = buildChartLastCandleSlice.actions;
export default buildChartLastCandleSlice.reducer;
