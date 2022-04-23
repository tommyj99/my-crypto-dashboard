import { createSlice } from "@reduxjs/toolkit";

export const buildChartSlice = createSlice({
  name: "buildChart",
  initialState: {
    chartObj: {},
    status: "idle",
    error: "none",
  },
  reducers: {
    buildChart: (state, action) => {
      Object.assign(state, action.payload);
      state.status = "succeeded";
    },
  },
});

export const { buildChart } = buildChartSlice.actions;
export default buildChartSlice.reducer;
