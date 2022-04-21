import {
  Stack,
  Button,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import React from "react";
import { ArrowDropDownCircleSharp } from "@mui/icons-material/SearchRounded";
import {
  selectFilteredByUsd,
  selectCoinStatus,
  selectCoin,
  selectCurrentExchange,
} from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";

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
  const [openModal, setOpenModal] = React.useState(false);
  const [price, setPrice] = React.useState("");
  const [chartInputObject, setChartInputObject] = React.useState([]);
  const [chartInputObectLastCandle, setChartInputObjectLastCandle] =
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
      setPrice(coinSelector.price);
      // buildChartApiInputObject();
      // buildChartApiInputObjectLastCandle();
      setOpen(false);
      setAnchorEl(null);
      setOpenModal(true);
    }
  }, [
    coinStatusSelector,
    coinSelector,
    // buildChartApiInputObject,
    // buildChartApiInputObjectLastCandle,
  ]);

  const handleExchangePopperClick = (Event) => {
    if (Event.currentTarget.innerText !== undefined) {
      const coinObj = {
        exchange: Event.currentTarget.innerText,
        coinPair: props.coin + "usd",
      };
      dispatch(fetchCoin(coinObj));
      dispatch(saveExchange(Event.currentTarget.innerText));
    }
  };

  const handleExchangeButtonClick = (Event) => {
    setOpen((open) => !open);
    setAnchorEl(Event.currentTarget);
  };

  function handleClickAway() {
    setOpen(false);
    setAnchorEl(null);
  }

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          name="exchange"
          id="exchange-button"
          // onClick={handleExchangeButtonClick}
          ref={anchorRef}
          variant="contained"
          // endIcon={<ArrowDropDownCircleSharp />}
        >
          Choose Exchange
        </Button>
        <Popper
          open={true}
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
                {markets[0].result.map((item, index) => {
                  if (item.pair === coinCurrencyPair) {
                    console.log(item.exchange);
                    return (
                      <MenuItem key={index} onClick={handleExchangePopperClick}>
                        {item.exchange}
                      </MenuItem>
                    );
                  }
                  return null;
                })}
              </MenuList>
              {/* <MenuList
                // autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="exchange-button"
                // onKeyDown={handleListKeyDown}
              >
                <MenuItem>Hi</MenuItem>
              </MenuList> */}
            </ClickAwayListener>
          </Paper>
        </Popper>
      </div>
    </Stack>
  );
};

export default ExchangeMenu;
