import { createSlice } from "@reduxjs/toolkit";

export const buildChartSlice = createSlice({
  name: "buildChart",
  initialState: {
    chartObj: {},
    status: "incomplete",
  },
  reducers: {
    buildChart: (state, action) => {
      Object.assign(state, action.payload);
      state.status = "complete";
    },
  },
});

export const { buildChart } = buildChartSlice.actions;
export default buildChartSlice.reducer;
