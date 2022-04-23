import { createSlice } from "@reduxjs/toolkit";

export const buildChartLastCandleSlice = createSlice({
  name: "buildChartLastCandle",
  initialState: {
    chartObjLastCandle: {},
    status: "incomplete",
  },
  reducers: {
    buildChartLastCandle: (state, action) => {
      Object.assign(state, action.payload);
    },
  },
});

export const { buildChartLastCandle } = buildChartLastCandleSlice.actions;
export default buildChartLastCandleSlice.reducer;
