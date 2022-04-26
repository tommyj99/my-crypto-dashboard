import { Box, Paper, Typography } from "@mui/material";
import {
  selectCoinStatus,
  selectCoinsMCap,
  selectCoinAndExchange,
  selectCoinAndExchangeStatus,
} from "../../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import {
  unixStartAndEndTimes,
  unixStartAndEndTimesLastCandle,
} from "../../timeUtils/timeUtils";
import MyChart from "../chart/MyChart";

const CoinAndGraph = (props) => {
  const dispatch = useDispatch();
  const coinStatusSelector = useSelector(selectCoinStatus);
  const coinsMCapSelect = useSelector(selectCoinsMCap);
  const coinAndExchangeSelect = useSelector(selectCoinAndExchange);
  const coinAndExchangeStatusSelect = useSelector(selectCoinAndExchangeStatus);
  const [coinCurrencyPair, setCoinCurrencyPair] = React.useState("btcusd");
  const [exchange, setExchange] = React.useState("coinbase-pro");
  const [coinImage, setCoinImage] = React.useState(
    coinsMCapSelect[props.elementNum].image
  );
  const [coinName, setCoinName] = React.useState(
    coinsMCapSelect[props.elementNum].name
  );
  const [coinRank, setCoinRank] = React.useState(
    coinsMCapSelect[props.elementNum].market_cap_rank
  );
  const [coinPrice, setCoinPrice] = React.useState(
    coinsMCapSelect[props.elementNum].current_price
  );
  const [coinLow, setCoinLow] = React.useState(
    coinsMCapSelect[props.elementNum].low_24h
  );
  const [coinHigh, setCoinHigh] = React.useState(
    coinsMCapSelect[props.elementNum].high_24h
  );
  const [coinChange24h, setCoinChange24h] = React.useState(
    coinsMCapSelect[props.elementNum].price_change_24h.toFixed(2)
  );
  const [coinPercentChange24h, setCoinPercentChange24h] = React.useState(
    coinsMCapSelect[props.elementNum].price_change_percentage_24h.toFixed(2)
  );

  const cryptoBox = React.useCallback(() => {
    if (coinAndExchangeStatusSelect) {
      setCoinImage(coinsMCapSelect[props.elementNum].image);
      setCoinName(coinsMCapSelect[props.elementNum].name);
      setCoinRank(coinsMCapSelect[props.elementNum].market_cap_rank);
      setCoinPrice(coinsMCapSelect[props.elementNum].current_price);
      setCoinLow(coinsMCapSelect[props.elementNum].low_24h);
      setCoinHigh(coinsMCapSelect[props.elementNum].high_24h);
      setCoinChange24h(
        coinsMCapSelect[props.elementNum].price_change_24h.toFixed(2)
      );
      setCoinPercentChange24h(
        coinsMCapSelect[props.elementNum].price_change_percentage_24h.toFixed(2)
      );
      setCoinCurrencyPair(coinAndExchangeSelect.coinCurrencyPair);
      setExchange(coinAndExchangeSelect.exchange);
      //dispatch(coin);
    }
  });
  // number = Math.floor(number * 100) / 100;
  React.useEffect(() => {
    cryptoBox();
  }, [cryptoBox]);

  const chartInputObject = {
    coin: coinCurrencyPair,
    startTime: unixStartAndEndTimes(new Date()).startTime,
    endTime: unixStartAndEndTimes(new Date()).endTime,
    period: 3600,
    exchange: exchange,
  };

  const chartInputObectLastCandle = {
    coin: coinCurrencyPair,
    startTime: unixStartAndEndTimesLastCandle(new Date()).startTime,
    endTime: unixStartAndEndTimesLastCandle(new Date()).endTime,
    period: 60,
    exchange: exchange,
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "62vh",
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
            height: "99%",
            paddingLeft: "15px",
            paddingTop: "15px",
            backgroundColor: "black",
            marginTop: "2px",
            borderRadius: "10px",
          }}
        >
          <img src={coinImage}></img>
          <Typography variant="h6" color="#fff8dc">
            {coinName}
          </Typography>
          <Typography color="#fff8dc">Rank: {coinRank}</Typography>
          <Typography color="#fff8dc">Price: {coinPrice}</Typography>
          <Typography color="#fff8dc">24hr low: {coinLow}</Typography>
          <Typography color="#fff8dc">24hr high: {coinHigh}</Typography>
          <Typography color="#fff8dc">24hr change: {coinChange24h}</Typography>
          <Typography color="#fff8dc">
            24hr %change: {coinPercentChange24h}
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
            height: "99%",
            backgroundColor: "black",
            borderRadius: "10px",
            marginTop: "2px",
            paddingBottom: "25px",
          }}
        >
          <Typography style={{ marginLeft: "10px" }} color="#fff8dc">
            Exchange: {exchange.toUpperCase()} 24hr
          </Typography>
          <MyChart
            // text={coinCurrencyPair}
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
