import {
  Stack,
  Button,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import * as React from "react";
import { ArrowDropDownCircle } from "@mui/icons-material/ArrowDropDownCircle";
import {
  selectFilteredByUsd,
  selectCoinStatus,
  selectCoin,
  selectCurrentExchange,
} from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { buildChart } from "../../redux/slices/buildChartSlice";
import { buildChartLastCandle } from "../../redux/slices/buildChartLastCandleSlice";
import { fetchCoin } from "../../redux/slices/simplePriceSlice";
import { saveExchange } from "../../redux/slices/marketsSlice";
import { unixStartAndEndTimes } from "../../timeUtils/timeUtils";
import { unixStartAndEndTimesLastCandle } from "../../timeUtils/timeUtils";

const ExchangeMenu = (props) => {
  const usdPairsSelector = useSelector(selectFilteredByUsd);
  const coinStatusSelector = useSelector(selectCoinStatus);
  const coinSelector = useSelector(selectCoin);
  const currentExchangeSelector = useSelector(selectCurrentExchange);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchorRef = React.useRef("exchange");
  const coinCurrencyPair = props.coin + "usd";
  const markets = Object.values(usdPairsSelector);
  const [price, setPrice] = React.useState("");
  // const [chartInputObject, setChartInputObject] = React.useState([]);
  // const [chartInputObectLastCandle, setChartInputObjectLastCandle] =
  React.useState([]);
  //const navigate = useNavigate();
  const dispatch = useDispatch();

  const exchangeAutoClick = React.useCallback(() => {
    anchorRef.current.click();
  }, [anchorRef]);

  React.useEffect(() => {
    if (coinStatusSelector === "idle") {
      exchangeAutoClick();
    }
  }, [exchangeAutoClick, coinStatusSelector]);

  React.useEffect(() => {
    if (coinStatusSelector === "succeeded") {
      setPrice(coinSelector.result.price);
      dispatch(buildChart(buildChartApiInputObject()));
      dispatch(buildChartLastCandle(buildChartApiInputObjectLastCandle()));
      setOpen(false);
      setAnchorEl(null);
    }
  }, [
    coinStatusSelector,
    coinSelector,
    // buildChartApiInputObject,
    // buildChartApiInputObjectLastCandle,
  ]);

  function buildChartApiInputObject() {
    let startEndHours = {};
    const dateNow = new Date();
    startEndHours = unixStartAndEndTimes(dateNow);
    return {
      coin: coinCurrencyPair,
      startTime: startEndHours.startTime,
      endTime: startEndHours.endTime,
      period: 3600,
      exchange: currentExchangeSelector,
    };
  }

  function buildChartApiInputObjectLastCandle() {
    let startEndHours = {};
    const dateNow = new Date();
    startEndHours = unixStartAndEndTimesLastCandle(dateNow);
    return {
      coin: coinCurrencyPair,
      startTime: startEndHours.startTime,
      endTime: startEndHours.endTime,
      period: 60,
      exchange: currentExchangeSelector,
    };
  }

  const handleExchangePopperClick = (Event) => {
    if (Event.currentTarget.innerText !== undefined) {
      const coinObj = {
        exchange: Event.currentTarget.innerText,
        coinCurrencyPair: props.coin + "usd",
      };
      // dispatch(buildChart(buildChartApiInputObject()));
      // dispatch(buildChartLastCandle(buildChartApiInputObjectLastCandle()));
      dispatch(fetchCoin(coinObj));
      dispatch(saveExchange(Event.currentTarget.innerText));
    }
  };

  const handleExchangeButtonClick = (Event) => {
    setOpen(!open);
    setAnchorEl(Event.currentTarget);
  };

  function handleClickAway() {
    setOpen(false);
    setAnchorEl(null);
  }
  console.log("open: ", open);
  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          name="exchange"
          id="exchange-button"
          onClick={handleExchangeButtonClick}
          ref={anchorRef}
          variant="contained"
          // endIcon={<ArrowDropDownCircle />}
        >
          Choose Exchange
        </Button>
        <Popper
          open={open}
          anchorEl={anchorEl}
          role={undefined}
          placement="bottom-end"
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClickAway}>
              <MenuList
                // autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="exchange-button"
                // onKeyDown={handleListKeyDown}
              >
                {markets[0].result.map((item, id) => {
                  if (item.pair === coinCurrencyPair && item.active === true) {
                    return (
                      <MenuItem key={id} onClick={handleExchangePopperClick}>
                        {item.exchange}
                      </MenuItem>
                    );
                  }
                  return null;
                })}
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Popper>
      </div>
    </Stack>
  );
};

export default ExchangeMenu;
