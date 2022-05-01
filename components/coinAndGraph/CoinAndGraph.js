import { Box, Paper, Typography } from "@mui/material";
import {
  selectCoinStatus,
  selectCoinsMCap,
  selectCoinAndExchange,
  selectCoinAndExchangeStatus,
} from "../../redux/selectors";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { useRef } from "react";
import {
  unixStartAndEndTimes,
  unixStartAndEndTimesLastCandle,
} from "../../timeUtils/timeUtils";
import MyChart from "../chart/MyChart";
import { saveCoinAndExchange } from "../../redux/slices/marketsSlice";

const CoinAndGraph = (props) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const coinsMCapSelect = useSelector(selectCoinsMCap);
  const coinAndExchangeSelect = useSelector(selectCoinAndExchange);
  const coinAndExchangeStatusSelect = useSelector(selectCoinAndExchangeStatus);

  const [coinCurrencyPair, setCoinCurrencyPair] = React.useState(
    coinAndExchangeSelect.coinCurrencyPair
  );
  const [exchange, setExchange] = React.useState(
    coinAndExchangeSelect.exchange
  );

  const [coinImage, setCoinImage] = React.useState();
  const [coinName, setCoinName] = React.useState();
  const [coinRank, setCoinRank] = React.useState();
  const [coinPrice, setCoinPrice] = React.useState();
  const [coinLow, setCoinLow] = React.useState();
  const [coinHigh, setCoinHigh] = React.useState();
  const [coinChange24h, setCoinChange24h] = React.useState();
  const [coinPercentChange24h, setCoinPercentChange24h] = React.useState();

  const [width, setWidth] = React.useState();
  const [isImageSmall, setIsImageSmall] = React.useState(false);

  const cryptoBox = React.useCallback(() => {
    if (coinAndExchangeStatusSelect) {
      setCoinImage(
        isImageSmall
          ? coinsMCapSelect[props.elementNum].image.replace("large", "small")
          : coinsMCapSelect[props.elementNum].image
      );

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
    }
  });

  React.useEffect(() => {
    cryptoBox();
  }, [cryptoBox, isImageSmall]);

  React.useEffect(() => {
    getChartWidth();
    if (width <= 648) {
      setIsImageSmall(true);
    } else setIsImageSmall(false);
  }, [width]);

  React.useEffect(() => {
    window.addEventListener("resize", getChartWidth);
  }, []);

  const getChartWidth = () => {
    if (ref.current !== null) {
      setWidth(ref.current.offsetWidth);
    }
  };

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
      ref={ref}
      sx={{
        display: "flex",
        flexWrap: width <= 648 ? "wrap" : undefined,
        height: "65vh",
        minHeight: "435px",
        backgroundColor: "gray",
        paddingLeft: "5px",
        paddingRight: "5px",
      }}
    >
      <Box
        sx={{
          minWidth: "320px",
          width: "24.6vw",
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
          minWidth: "1vh",
        }}
      />
      <Box
        sx={{
          width: width <= 648 ? "320px" : "75.4vw",
          minWidth: "320px",
          minHeight: "260px",
        }}
      >
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
            width={width}
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
