import { Box, Paper, Typography } from "@mui/material";
import { selectCoinStatus, selectCoinsMCap } from "../../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import { fetchCoin } from "../../redux/slices/simplePriceSlice";
import React from "react";
import { unixStartAndEndTimes } from "../../timeUtils/timeUtils";
import MyChart from "../chart/MyChart";
import { fetchOhlcData } from "../../redux/slices/ohlcSlice";
import { fetchOhlcModifiableData } from "../../redux/slices/ohlcModifiableSlice";

const CoinAndGraph = (props) => {
  const dispatch = useDispatch();
  const coinStatusSelector = useSelector(selectCoinStatus);
  const coinsMCapSelect = useSelector(selectCoinsMCap);
  const [coinPair, setCoinPair] = React.useState("btcusd");
  const [exchange, setExchange] = React.useState("coinbase-pro");
  const [coinImage, setCoinImage] = React.useState(null);
  const [coinName, setCoinName] = React.useState(null);
  const [coinRank, setCoinRank] = React.useState(null);
  const [coinPrice, setCoinPrice] = React.useState(null);
  const [coinLow, setCoinLow] = React.useState(null);
  const [coinHigh, setCoinHigh] = React.useState(null);
  const [coinChange24h, setCoinChange24h] = React.useState(null);

  const cryptoBox = React.useCallback(() => {
    setCoinImage(coinsMCapSelect[props.elementNum].image);
    setCoinName(coinsMCapSelect[props.elementNum].name);
    setCoinRank(coinsMCapSelect[props.elementNum].market_cap_rank);
    setCoinPrice(coinsMCapSelect[props.elementNum].current_price);
    setCoinLow(coinsMCapSelect[props.elementNum].low_24h);
    setCoinHigh(coinsMCapSelect[props.elementNum].high_24h);
    setCoinChange24h(coinsMCapSelect[props.elementNum].price_change_24h);
  });

  React.useEffect(() => {
    cryptoBox();
  }, [cryptoBox]);

  React.useEffect(() => {
    if (coinStatusSelector === "idle") {
      const coinObj = {
        exchange: exchange,
        coinPair: coinPair,
      };
      dispatch(fetchCoin(coinObj));
    }
  }, []);

  const chartInputObject = {
    coin: coinPair,
    startTime: unixStartAndEndTimes(new Date()).startTime,
    endTime: unixStartAndEndTimes(new Date()).endTime,
    period: 3600,
    exchange: exchange,
  };

  const chartInputObectLastCandle = {
    coin: coinPair,
    startTime: unixStartAndEndTimes(new Date()).startTime,
    endTime: unixStartAndEndTimes(new Date()).endTime,
    period: 60,
    exchange: exchange,
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "65vh",
        minHeight: "435px",
        width: "100%",
        backgroundColor: "gray",
        paddingLeft: "5px",
        paddingRight: "5px",
      }}
    >
      <Box
        sx={{
          minWidth: "30vw",
        }}
      >
        <Paper
          style={{
            height: "100%",
            paddingLeft: "15px",
            paddingTop: "15px",
            backgroundColor: "black",
            marginTop: "2px",
            borderRadius: "10px",
          }}
        >
          <img src={coinImage}></img>
          <Typography variant="h6" color="white">
            {coinName}
          </Typography>
          <Typography color="white">Rank: {coinRank}</Typography>
          <Typography color="white">Price: {coinPrice}</Typography>
          <Typography color="white">24 hr low: {coinLow}</Typography>
          <Typography color="white">24 hr high: {coinHigh}</Typography>
          <Typography color="white">
            24 hr price change: {coinChange24h.toFixed(2)}
          </Typography>
        </Paper>
      </Box>
      <Box
        sx={{
          minWidth: ".5vw",
        }}
      />
      <Box sx={{ width: "69.5vw" }}>
        <Paper
          style={{
            height: "100%",
            backgroundColor: "black",
            borderRadius: "10px",
          }}
        >
          <MyChart
            chartInputObject={chartInputObject}
            chartInputObjectLastCandle={chartInputObectLastCandle}
          />
          {/* <Button onClick={props.handleModalClick1}>Show Full Chart</Button>
            <Button onClick={props.handleModalClick2}>Add to Portfolio</Button>
            <Button onClick={props.handleModalClick3}>Exit</Button> */}
          {/* </Box> */}
        </Paper>
      </Box>
    </Box>
  );
};

export default CoinAndGraph;
