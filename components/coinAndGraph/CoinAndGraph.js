import { Box, Paper, Typography } from "@mui/material";
import {
  selectCoinStatus,
  selectOhlcData,
  selectOhlcStatus,
  selectOhlcModifiableData,
  selectOhlcModifiableStatus,
} from "../../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { fetchCoin } from "../../redux/slices/simplePriceSlice";
import React from "react";
import { unixStartAndEndTimes } from "../../timeUtils/timeUtils";
import { fetchOhlcData } from "../../redux/slices/ohlcSlice";
import { fetchOhlcModifiableData } from "../../redux/slices/ohlcModifiableSlice";

const CoinAndGraph = () => {
  const dispatch = useDispatch();
  const coinStatusSelector = useSelector(selectCoinStatus);
  const ohlcDataSelector = useSelector(selectOhlcData);
  const ohlcStatusSelector = useSelector(selectOhlcStatus);
  const ohlcModifiableDataSelector = useSelector(selectOhlcModifiableData);
  const ohlcModifiableStatusSelector = useSelector(selectOhlcModifiableStatus);
  const style = {
    //position: "relative",
    // top: "0%",
    // left: "0%",
    minWidth: "100%",
    minHeight: "100%",
    bgcolor: "background.paper",
    border: "1px solid #000",

    // pt: 2,
    // px: 4,
    // pb: 3,
  };

  if (coinStatusSelector === "idle") {
    const coinObj = {
      exchange: "coinbase-pro",
      coinPair: "btcusd",
    };
    dispatch(fetchCoin(coinObj));
  }

  const chartInputObject = {
    coin: "btcusd",
    startTime: unixStartAndEndTimes(new Date()).startTime,
    endTime: unixStartAndEndTimes(new Date()).endTime,
    period: 3600,
    exchange: "coinbase-pro",
  };

  const chartInputObectLastCandle = {
    coin: "btcusd",
    startTime: unixStartAndEndTimes(new Date()).startTime,
    endTime: unixStartAndEndTimes(new Date()).endTime,
    period: 60,
    exchange: "coinbase-pro",
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "65vh",
      }}
    >
      <Box sx={{ width: "30vw" }}>
        <Paper
          style={{
            height: "100%",
          }}
        >
          <Typography>{}</Typography>
        </Paper>
      </Box>
      <Box
        sx={{
          width: ".5vw",
        }}
      />
      <div style={{ width: "70vw" }}>
        <Paper
          style={{
            height: "100%",
          }}
        >
          {/* <Box sx={{ ...style }}> */}
          {/* <Chart
            chartInputObj={chartInputObject}
            chartInputObjLastCandle={chartInputObectLastCandle}
          /> */}
          {/* <Button onClick={props.handleModalClick1}>Show Full Chart</Button>
            <Button onClick={props.handleModalClick2}>Add to Portfolio</Button>
            <Button onClick={props.handleModalClick3}>Exit</Button> */}
          {/* </Box> */}
        </Paper>
      </div>
    </Box>
  );
};

export default CoinAndGraph;
