import Head from "next/head";
import styles from "../styles/Home.module.css";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Paper,
  Popper,
  List,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCoinsAll,
  selectMarketsData,
  selectMarketsStatus,
  selectIsExchanges,
  selectCoinsMCapStatus,
  selectCoinsMCap,
  selectCoinAndExchangeStatus,
  // selectBuildChartStatus,
  // selectBuildChartStatusLastCandle,
  // selectCurrentCoinAndExchange,
} from "../redux/selectors";
import SearchItem from "../components/searchItem/SearchItem";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import { filterByUsd, isExchanges } from "../redux/slices/marketsSlice";
import ExchangeMenu from "../components/exchangeMenu/ExchangeMenu";
import CoinAndGraph from "../components/coinAndGraph/CoinAndGraph";
import CoinList from "../components/coinlist/CoinList";
import { coinClear } from "../redux/slices/simplePriceSlice";
import { fetchCoinsByMarketCap } from "../redux/slices/marketCapSlice";
import { fetchAllCoins } from "../redux/slices/coinsAllSlice";
import { fetchMarkets } from "../redux/slices/marketsSlice";

// styled component section
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Home() {
  const dispatch = useDispatch();
  // selectors
  const coinsAllSelector = useSelector(selectCoinsAll);
  const marketsSelector = useSelector(selectMarketsData);
  const marketsStatusSelector = useSelector(selectMarketsStatus);
  const isExchangesSelector = useSelector(selectIsExchanges);
  const coinsMCapSelectStatus = useSelector(selectCoinsMCapStatus);
  const coinsMCapSelect = useSelector(selectCoinsMCap);

  const coinAndExchangeStatusSelect = useSelector(selectCoinAndExchangeStatus);
  // hooks
  const [coinSymbol, setCoinSymbol] = React.useState("");
  const [coinList, setCoinList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [usdFilter, setUsdFilter] = React.useState(false);
  const [coin, setCoin] = React.useState("");
  const [elementNum, setElementNum] = React.useState(0);

  // React.useEffect(() => {
  //   console.log("coinChangeStatus: ", coinAndExchangeStatusSelect);
  //   if (!coinAndExchangeStatusSelect) {
  //     dispatch(fetchAllCoins());
  //     dispatch(fetchCoinsByMarketCap()); // coin gecko
  //     dispatch(fetchMarkets()); // crytpo watch
  //   }
  //   if (coinSymbol !== "") {
  //     coinsAllSelector.forEach((result) => {
  //       if (result.symbol.toLowerCase().startsWith(coinSymbol.toLowerCase())) {
  //         // populate symbol list
  //         setCoinList((prevArray) => [...prevArray, result.symbol]);
  //       }
  //     });
  //   }
  //   if (marketsStatusSelector === "succeeded" && usdFilter === false) {
  //     dispatch(filterByUsd(filterUsd()));
  //     setUsdFilter(true);
  //   }
  // }, [
  //   coinAndExchangeStatusSelect,
  //   coinSymbol,
  //   coinsAllSelector,
  //   marketsStatusSelector,
  // ]);

  // dispatch(fetchAllCoins());
  // dispatch(fetchCoinsByMarketCap()); // coin gecko
  // dispatch(fetchMarkets()); // crytpo watch

  React.useEffect(() => {
    console.log("coinChangeStatus: ", coinAndExchangeStatusSelect);
    if (!coinAndExchangeStatusSelect) {
      dispatch(fetchAllCoins());
      dispatch(fetchCoinsByMarketCap()); // coin gecko
      dispatch(fetchMarkets()); // crytpo watch
    }
  }, [coinAndExchangeStatusSelect]);
  //Called when search bar is being populated
  React.useEffect(() => {
    if (coinSymbol !== "") {
      coinsAllSelector.forEach((result) => {
        if (result.symbol.toLowerCase().startsWith(coinSymbol.toLowerCase())) {
          // populate symbol list
          setCoinList((prevArray) => [...prevArray, result.symbol]);
        }
      });
    }
  }, [coinSymbol, coinsAllSelector]);

  React.useEffect(() => {
    // console.log("mss: ", marketsStatusSelector);
    // console.log("usdFilter: ", usdFilter);
    if (marketsStatusSelector === "succeeded" && usdFilter === false) {
      dispatch(filterByUsd(filterUsd()));
      setUsdFilter(true);
    }
  }, [marketsStatusSelector]);

  function filterUsd() {
    let filteredByUsdPairs = [];
    const unfilteredMarkets = Object.values(marketsSelector);
    unfilteredMarkets[0].result.forEach((item) => {
      if (item.pair.endsWith("usd") && item.active === true) {
        filteredByUsdPairs.push(item);
      }
    });
    return filteredByUsdPairs;
  }

  // SECTION handlers
  function handleChange(Event) {
    setCoinList([]);
    setCoinSymbol(Event.target.value);
    setAnchorEl(Event.currentTarget);
    setOpen(true);
  }

  // you will have to rework this when cryptowatch comes back
  function handleSearchOnEnter(Event) {
    if (Event.charCode === 13) {
      if (coinSymbol !== "" && coinList.length !== 0) {
        dispatch(isExchanges(true));
        dispatch(coinClear());
        setCoin(coinSymbol);
      } else {
        // set the coin box here for now
        coinsMCapSelect.forEach((item) => {
          if (coinSymbol === item.symbol) {
            setElementNum(item.market_cap_rank - 1);
          }
        });
        setCoinSymbol("");
      }
    }
  }

  function handleClick(Event) {
    setOpen(false);
    dispatch(isExchanges(true));
    dispatch(coinClear());
    if (Event.currentTarget.innerText !== undefined) {
      setCoin(Event.currentTarget.innerText);
      coinsMCapSelect.forEach((item) => {
        if (coinSymbol === item.symbol) {
          setElementNum(item.market_cap_rank - 1);
        }
      });
    }
  }

  function handleClickAway() {
    setOpen(false);
    setAnchorEl(null);
    setCoinSymbol("");
  }

  // SECTION misc functions

  const ExchangeButton = () => {
    if (isExchangesSelector && marketsStatusSelector === "succeeded") {
      return <ExchangeMenu coin={coin} />;
    }
    return null;
  };
  if (coinsMCapSelectStatus === "succeeded") {
    return (
      <div className={styles.container}>
        <Head>
          <title>Crypto Dashboard</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.container}>
          <Box>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open-drawer"
                  sx={{ mr: 2 }}
                >
                  <MenuRoundedIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                >
                  My Crypto App
                </Typography>
                <ExchangeButton />
                {/* <ExchangeMenu /> */}
                <Search hidden={isExchangesSelector} data-testid="search-bar">
                  <SearchIconWrapper aria-label="search-icon">
                    <SearchRoundedIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search coin…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={handleChange}
                    onKeyPress={handleSearchOnEnter}
                    value={coinSymbol}
                  ></StyledInputBase>
                </Search>

                <Popper
                  aria-label="popper"
                  open={open}
                  anchorEl={anchorEl}
                  placement="bottom-end"
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClickAway}>
                      <List>
                        {coinList.map((listItem, index) => (
                          <SearchItem
                            key={index}
                            listText={listItem}
                            handleClick={handleClick}
                          />
                        ))}
                      </List>
                    </ClickAwayListener>
                  </Paper>
                </Popper>
              </Toolbar>
            </AppBar>
            <CoinAndGraph elementNum={elementNum} />
            <CoinList />
          </Box>
        </main>
      </div>
    );
  } else return null;
}
