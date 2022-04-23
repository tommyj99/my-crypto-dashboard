import { combineReducers } from "redux";
import coinsAllReducer from "./slices/coinsAllSlice";
import marketCapReducer from "./slices/marketCapSlice";
import simplePriceReducer from "./slices/simplePriceSlice";
import marketsReducer from "./slices/marketsSlice";
import counterReducer from "./slices/counterSlice";
import ohlcReducer from "./slices/ohlcSlice";
import ohlcModifiableReducer from "./slices/ohlcModifiableSlice";
import buildChartReducer from "./slices/buildChartSlice";
import buildChartLastCandleReducer from "./slices/buildChartLastCandleSlice";

const reducer = combineReducers({
  coinsAll: coinsAllReducer,
  coinsByMarketCap: marketCapReducer,
  coin: simplePriceReducer,
  markets: marketsReducer,
  counter: counterReducer,
  ohlc: ohlcReducer,
  ohlcModifiable: ohlcModifiableReducer,
  buildChart: buildChartReducer,
  buildChartLastCandle: buildChartLastCandleReducer,
});

export default reducer;
