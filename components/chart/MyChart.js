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
import { Skeleton, Typography } from "@mui/material";
import Spinner from "../spinner/Spinner";

const MyChart = (props) => {
  const dispatch = useDispatch();
  const ohlcDataSelector = useSelector(selectOhlcData);
  const ohlcStatusSelector = useSelector(selectOhlcStatus);
  const ohlcModifiableDataSelector = useSelector(selectOhlcModifiableData);
  const ohlcModifiableStatusSelector = useSelector(selectOhlcModifiableStatus);
  const coinAndExchangeStatusSelect = useSelector(selectCoinAndExchangeStatus);
  // const [skeletonHeight, setSkeletonHeight] = React.useState(0);

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
        <div
          style={{
            height: "100%",
          }}
        >
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
  } else {
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
        <div
          style={{
            height: "100%",
          }}
        >
          <Skeleton
            sx={{
              bgcolor: "midnightblue",
              display: "flex",
              height: "95%",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "10%",
              marginRight: "10%",
              borderRadius: "10px",
            }}
            variant="rectangle"
            width="250"
            height="250"
          />
        </div>
      </Box>
    );
  }
};

export default MyChart;
