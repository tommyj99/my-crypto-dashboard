import * as React from "react";
import Box from "@mui/material/Box";
import CandleStickCanvas from "../candlestickCanvas/CandleStickCanvas";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { fetchOhlcData } from "../../redux/slices/ohlcSlice";
import {
  selectOhlcData,
  selectOhlcStatus,
  selectOhlcModifiableData,
  selectOhlcModifiableStatus,
  selectCoinAndExchangeStatus,
} from "../../redux/selectors";
import { fetchOhlcModifiableData } from "../../redux/slices/ohlcModifiableSlice";
import { Typography } from "@mui/material";

const MyChart = (props) => {
  const dispatch = useDispatch();
  const ohlcDataSelector = useSelector(selectOhlcData);
  const ohlcStatusSelector = useSelector(selectOhlcStatus);
  const ohlcModifiableDataSelector = useSelector(selectOhlcModifiableData);
  const ohlcModifiableStatusSelector = useSelector(selectOhlcModifiableStatus);
  const coinAndExchangeStatusSelect = useSelector(selectCoinAndExchangeStatus);

  React.useEffect(() => {
    dispatch(fetchOhlcData(props.chartInputObject));
    dispatch(fetchOhlcModifiableData(props.chartInputObjectLastCandle));
  }, [props.chartInputObject.coin, props.chartInputObject.exchange]);
  if (
    ohlcStatusSelector === "succeeded" &&
    ohlcModifiableStatusSelector === "succeeded"
  ) {
    return (
      <Box
        sx={{
          width: "99%",
          height: "99%",
          bgcolor: "black",
          marginTop: "2px",
          marginLeft: "2px",
          borderRadius: "10px",
        }}
      >
        {/* <h3>
        {props.coinText}: {props.price}
      </h3> */}
        <div
          style={{
            height: "100%",
          }}
        >
          {/* <Typography>{props.text}</Typography> */}
          <CandleStickCanvas
            style={{
              height: "100%",
            }}
            data={ohlcDataSelector}
            status={ohlcStatusSelector}
            datalastcandle={ohlcModifiableDataSelector}
            statuslastcandle={ohlcModifiableStatusSelector}
          />
        </div>
        {/* <Button onClick={props.handleModalClick1}>Show Full Chart</Button>
      <Button onClick={props.handleModalClick2}>Add to Portfolio</Button>
      <Button onClick={props.handleModalClick3}>Exit</Button> */}
      </Box>
    );
  }
};

export default MyChart;
