import * as React from "react";
import Box from "@mui/material/Box";
import CandleStickCanvas from "../candlestickCanvas/CandleStickCanvas";
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
import { Skeleton } from "@mui/material";

const MyChart = (props) => {
  const dispatch = useDispatch();
  const ohlcDataSelector = useSelector(selectOhlcData);
  const ohlcStatusSelector = useSelector(selectOhlcStatus);
  const ohlcModifiableDataSelector = useSelector(selectOhlcModifiableData);
  const ohlcModifiableStatusSelector = useSelector(selectOhlcModifiableStatus);

  React.useEffect(() => {
    dispatch(fetchOhlcData(props.chartInputObject));
    dispatch(fetchOhlcModifiableData(props.chartInputObjectLastCandle));
  }, [props.chartInputObject.coin, props.chartInputObject.exchange]);

  const ChartSkeleton = () => {
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
        <Box sx={{ height: "100%" }}>
          <Box
            sx={{
              display: "flex",
              height: "80%",
              bgcolor: "balck",
            }}
          >
            <Skeleton
              sx={{
                bgcolor: "midnightblue",
                // display: "flex",
                height: "98%",
                width: "15vw",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "15%",
                borderRadius: "10px",
              }}
              variant="rectangle"
            />
            <Skeleton
              sx={{
                bgcolor: "midnightblue",
                display: "flex",
                height: "98%",
                width: "85vw",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "1%",
                marginRight: "15%",
                borderRadius: "10px",
              }}
              variant="rectangle"
            />
          </Box>
          <Box sx={{ display: "flex", height: "100%" }}>
            <Skeleton
              sx={{
                bgcolor: "midnightblue",
                height: "15%",
                width: "48vw",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "27%",
                marginRight: "15%",
                borderRadius: "10px",
              }}
              variant="rectangle"
            />
          </Box>
        </Box>
      </Box>
    );
  };

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
    return <ChartSkeleton />;
  }
};

export default MyChart;
