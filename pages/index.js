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
  MenuList,
  MenuItem,
  Popover,
} from "@mui/material";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
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
} from "../redux/selectors";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
  filterByUsd,
  isExchanges,
  setCoinAndExchangeStatus,
  saveCoinAndExchange,
} from "../redux/slices/marketsSlice";
import ExchangeMenu from "../components/exchangeMenu/ExchangeMenu";
import CoinAndGraph from "../components/coinAndGraph/CoinAndGraph";
import CoinList from "../components/coinlist/CoinList";
import { coinClear } from "../redux/slices/simplePriceSlice";
import { fetchCoinsByMarketCap } from "../redux/slices/marketCapSlice";
import { fetchAllCoins } from "../redux/slices/coinsAllSlice";
import { fetchMarkets } from "../redux/slices/marketsSlice";
import { useRef } from "react";
import Router from "next/router";

// styled component section
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "50%",
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
  color: "#fff8dc",
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
  const appBarRef = useRef();
  const router = Router;
  // selectors
  const coinsAllSelector = useSelector(selectCoinsAll);
  const coinsOneThousandSelector = useSelector(selectCoinsMCap);
  const marketsSelector = useSelector(selectMarketsData);
  const marketsStatusSelector = useSelector(selectMarketsStatus);
  const isExchangesSelector = useSelector(selectIsExchanges);
  const coinsMCapSelectStatus = useSelector(selectCoinsMCapStatus);
  const coinsMCapSelect = useSelector(selectCoinsMCap);

  const coinAndExchangeStatusSelect = useSelector(selectCoinAndExchangeStatus);
  // hooks
  const [coinSymbol, setCoinSymbol] = React.useState("");
  const [coinSymbolCopy, setCoinSymbolCopy] = React.useState("");
  const [coinList, setCoinList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [usdFilter, setUsdFilter] = React.useState(false);
  const [coin, setCoin] = React.useState("");
  const [elementNum, setElementNum] = React.useState(0);
  const [width, setWidth] = React.useState();
  let coinMatch = false;

  React.useEffect(() => {
    dispatch(fetchAllCoins());
    dispatch(fetchCoinsByMarketCap()); // coin gecko
    dispatch(fetchMarkets()); // crytpo watch
    function coinObj() {
      return (coinObj = {
        exchange: "coinbase-pro",
        coinCurrencyPair: "btcusd",
      });
    }
    dispatch(saveCoinAndExchange(coinObj()));
  }, []);

  //Called when search bar is being populated
  React.useEffect(() => {
    if (coinSymbol !== "") {
      coinsOneThousandSelector.forEach((result) => {
        if (result.symbol.toLowerCase().startsWith(coinSymbol.toLowerCase())) {
          // populate symbol list
          setCoinList((prevArray) => [...prevArray, result.symbol]);
        }
      });
    }
  }, [coinSymbol, coinsOneThousandSelector]);

  React.useEffect(() => {
    if (marketsStatusSelector === "succeeded" && usdFilter === false) {
      dispatch(filterByUsd(filterUsd()));
      setUsdFilter(true);
    }
  }, [marketsStatusSelector]);

  React.useEffect(() => {
    window.addEventListener("resize", getMainWidth);
  }, []);

  const getMainWidth = () => {
    if (appBarRef.current !== null) {
      setWidth(appBarRef.current.offsetWidth);
    }
  };

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
    if (Event.target.value !== undefined) {
      setCoinSymbol(Event.target.value.toLowerCase());
      console.log("in event");
      setAnchorEl(Event.currentTarget);
      setOpen(true);
    }
  }

  const handleClose = () => {
    setDialogOpen(false);
    setCoinSymbol("");
  };

  function handleSearchOnEnter(Event) {
    if (Event.charCode === 13) {
      if (coinSymbol !== "") {
        coinList.forEach((item) => {
          if (item === coinSymbol) {
            coinMatch = true;
          }
        });
        setOpen(false);
        dispatch(coinClear());
        if (coinMatch === true) {
          dispatch(isExchanges(true));
          dispatch(setCoinAndExchangeStatus(false));
          setCoin(coinSymbol);
          coinsMCapSelect.forEach((item) => {
            if (coinSymbol === item.symbol) {
              setElementNum(item.market_cap_rank - 1);
            }
          });
        } else {
          setCoinSymbolCopy(coinSymbol);
          setDialogOpen(true);
        }
      }
      setCoinSymbol("");
    }
  }

  function handleClick(Event) {
    if (Event.currentTarget.innerText !== undefined && coinList.length !== 0) {
      let coinClicked = Event.currentTarget.innerText.toLowerCase().trim();
      setOpen(false);
      dispatch(isExchanges(true));
      dispatch(coinClear());
      dispatch(setCoinAndExchangeStatus(false));
      setCoin(coinClicked);
      coinsMCapSelect.forEach((item) => {
        if (coinClicked === item.symbol) {
          setElementNum(item.market_cap_rank - 1);
        }
      });
      setCoinSymbol("");
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
    } else if (coinMatch === false) {
      return (
        <Popover
          open={dialogOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Typography sx={{ p: 2 }}>
            Coin &quot;{coinSymbolCopy}&quot; not found! Please check spelling
            and retry.
          </Typography>
        </Popover>
      );
    }
    return null;
  };

  if (coinsMCapSelectStatus === "succeeded") {
    return (
      <Box ref={appBarRef}>
        <Head>
          <title>Crypto Dashboard</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Box>
          {width > 648 || window.innerWidth > 660 ? (
            <AppBar
              style={{ backgroundColor: "midnightblue" }}
              position="static"
            >
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open-drawer"
                  sx={{ mr: 2 }}
                >
                  <MenuRoundedIcon style={{ color: "#fff8dc" }} />
                </IconButton>
                <Typography
                  variant="h6"
                  sx={{
                    color: "#fff8dc",
                  }}
                >
                  CryptoMon
                </Typography>
                <IconButton
                  sx={{ marginLeft: "170px", marginRight: "25px" }}
                  onClick={() => router.replace("https://tommyj.net/portfolio")}
                >
                  <BusinessCenterIcon
                    style={{
                      color: "#fff8dc",
                    }}
                  ></BusinessCenterIcon>
                </IconButton>
                <Box
                  noWrap
                  component="div"
                  sx={{
                    flexGrow: 1,
                  }}
                />
                <ExchangeButton />
                <Search hidden={isExchangesSelector} data-testid="search-bar">
                  <SearchIconWrapper aria-label="search-icon">
                    <SearchRoundedIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search coin???"
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
                      <MenuList
                        style={{
                          backgroundColor: "#fff8dc",
                        }}
                      >
                        {coinList.map((listItem, index) => (
                          <MenuItem
                            style={{ color: "blue" }}
                            key={index}
                            onClick={handleClick}
                          >
                            {listItem}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Popper>
              </Toolbar>
            </AppBar>
          ) : (
            <Box>
              <AppBar
                style={{ backgroundColor: "midnightblue" }}
                position="static"
              >
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="open-drawer"
                    sx={{ mr: 2 }}
                  >
                    <MenuRoundedIcon style={{ color: "#fff8dc" }} />
                  </IconButton>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      color: "#fff8dc",
                    }}
                  >
                    CryptoMon
                  </Typography>
                  <IconButton
                    sx={{ marginLeft: "150px" }}
                    onClick={() =>
                      router.replace("https://tommyj.net/portfolio")
                    }
                  >
                    <BusinessCenterIcon
                      style={{
                        color: "#fff8dc",
                      }}
                    ></BusinessCenterIcon>
                  </IconButton>
                </Toolbar>
              </AppBar>
              <AppBar
                style={{ backgroundColor: "midnightblue" }}
                position="static"
              >
                <Toolbar>
                  <ExchangeButton />
                  <Search hidden={isExchangesSelector} data-testid="search-bar">
                    <SearchIconWrapper aria-label="search-icon">
                      <SearchRoundedIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search coin???"
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
                        <MenuList
                          style={{
                            backgroundColor: "#fff8dc",
                          }}
                        >
                          {coinList.map((listItem, index) => (
                            <MenuItem
                              style={{ color: "blue" }}
                              key={index}
                              onClick={handleClick}
                            >
                              {listItem}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Popper>
                </Toolbar>
              </AppBar>
            </Box>
          )}
          <CoinAndGraph elementNum={elementNum} />
          <CoinList />
        </Box>
      </Box>
    );
  } else return null;
}
