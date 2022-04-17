import * as React from "react";
import Box from "@mui/material/Box";
import CandleStickCanvas from "../candlestickChart/CandleStickCanvas";
import Button from "@mui/material/Button";
import { useSelector, useDispatch } from "react-redux";
import { fetchOhlcData } from "../../redux/slices/ohlcSlice";
import {
  selectOhlcData,
  selectOhlcStatus,
  selectOhlcModifiableData,
  selectOhlcModifiableStatus,
} from "../../redux/selectors";
import { fetchOhlcModifiableData } from "../../redux/slices/ohlcModifiableSlice";

const MyChart = (props) => {
  const dispatch = useDispatch();
  const ohlcDataSelector = useSelector(selectOhlcData);
  const ohlcStatusSelector = useSelector(selectOhlcStatus);
  const ohlcModifiableDataSelector = useSelector(selectOhlcModifiableData);
  const ohlcModifiableStatusSelector = useSelector(selectOhlcModifiableStatus);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  React.useEffect(() => {
    dispatch(fetchOhlcData(props.chartInputObject));
    dispatch(fetchOhlcModifiableData(props.chartInputObjectLastCandle));
  }, [dispatch, props.chartInputObject, props.chartInputObjectLastCandle]);

  return (
    <Box sx={{ ...style, width: 485 }}>
      {/* <h3>
        {props.coinText}: {props.price}
      </h3> */}
      <CandleStickCanvas
        data={ohlcDataSelector}
        status={ohlcStatusSelector}
        datalastcandle={ohlcModifiableDataSelector}
        statuslastcandle={ohlcModifiableStatusSelector}
      />
      {/* <Button onClick={props.handleModalClick1}>Show Full Chart</Button>
      <Button onClick={props.handleModalClick2}>Add to Portfolio</Button>
      <Button onClick={props.handleModalClick3}>Exit</Button> */}
    </Box>
  );
};

export default MyChart;
