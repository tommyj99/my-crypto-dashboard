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

  // React.useEffect(() => {
  //   console.log("myChart: ", props.width);
  //   setSkeletonHeight(props.width * 0.5);
  //   console.log("sh: ", skeletonHeight);
  // }, [props.width]);

  // const ChartSkeleton = () => {
  //   return (
  //     <div style={{ height: "100%" }}>
  //       <Skeleton
  //         sx={{
  //           bgcolor: "white",
  //           marginTop: "1%",
  //           marginLeft: "10%",
  //           marginRight: "10%",
  //           borderRadius: "10px",
  //         }}
  //         variant="rectangular"
  //         width={props.width}
  //         height={skeletonHeight}
  //       />
  //     </div>
  //   );
  // };

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
          {/* <Spinner /> */}
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
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      </Box>
    );
  }
};

export default MyChart;
