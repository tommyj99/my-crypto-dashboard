import {
  Stack,
  Button,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  ListItem,
} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import * as React from "react";
import ArrowDropDownCircle from "@mui/icons-material/ArrowDropDownCircle";
import HomeIcon from "@mui/icons-material/Home";
import {
  selectFilteredByUsd,
  selectCoinStatus,
  selectCoinAndExchangeStatus,
} from "../../redux/selectors";
import { useDispatch, useSelector } from "react-redux";
import { saveCoinAndExchange } from "../../redux/slices/marketsSlice";
import { isExchanges } from "../../redux/slices/marketsSlice";
import { setCoinAndExchangeStatus } from "../../redux/slices/marketsSlice";
import { CommentsDisabledOutlined } from "@mui/icons-material";
const ExchangeMenu = (props) => {
  const usdPairsSelector = useSelector(selectFilteredByUsd);
  const coinStatusSelector = useSelector(selectCoinStatus);
  const coinAndExchangeStatusSelect = useSelector(selectCoinAndExchangeStatus);
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const anchorRef = React.useRef("exchange");
  const coinCurrencyPair = props.coin + "usd";
  //const [marketsFiltered, setMarketsFiltered] = React.useState();
  const marketsFiltered = Object.values(usdPairsSelector);
  const [price, setPrice] = React.useState("");
  const dispatch = useDispatch();

  const exchangeAutoClick = React.useCallback(() => {
    anchorRef.current.click();
  }, [anchorRef]);

  React.useEffect(() => {
    if (coinStatusSelector === "idle" && !coinAndExchangeStatusSelect) {
      exchangeAutoClick();
    }
  }, [exchangeAutoClick, coinStatusSelector]);

  const handleExchangePopperClick = (Event) => {
    if (Event.currentTarget.innerText !== undefined) {
      function coinObj() {
        return (coinObj = {
          exchange: Event.currentTarget.innerText,
          coinCurrencyPair: props.coin + "usd",
        });
      }
      dispatch(saveCoinAndExchange(coinObj()));
      //dispatch(setCoinAndExchangeStatus(false));
    }
    setOpen(false);
    setAnchorEl(null);
  };

  const handleExchangeButtonClick = (Event) => {
    setOpen(!open);
    setAnchorEl(Event.currentTarget);
  };

  const handleNewSearchClick = (Event) => {
    dispatch(isExchanges(false));
    dispatch(setCoinAndExchangeStatus(false));
    setOpen(false);
    setAnchorEl(null);
  };

  function handleClickAway() {
    setOpen(false);
    setAnchorEl(null);
  }

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          style={{ backgroundColor: "#fff8dc", color: "blue" }}
          name="exchange"
          id="exchange-button"
          onClick={handleExchangeButtonClick}
          ref={anchorRef}
          variant="contained"
        >
          Choose Exchange
          <ArrowDropDownCircle style={{ marginLeft: "5px", color: "blue" }} />
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
                style={{
                  backgroundColor: "#fff8dc",
                }}
                // autoFocusItem={open}
                id="composition-menu"
                aria-labelledby="exchange-button"
                // onKeyDown={handleListKeyDown}
              >
                <MenuItem
                  style={{ color: "magenta" }}
                  onClick={handleNewSearchClick}
                >
                  Search new coin
                </MenuItem>

                {marketsFiltered.map((item, id) => {
                  if (item.pair === coinCurrencyPair && item.active === true) {
                    return (
                      <MenuItem
                        style={{ color: "blue" }}
                        key={id}
                        onClick={handleExchangePopperClick}
                      >
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
