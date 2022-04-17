import { Paper } from "@mui/material";

const CarouselItem = (props) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div>{props.coin}</div>
      <div>{props.image}</div>
      <div>Rank: {props.rank}</div>
      <div>Symbol: {props.symbol}</div>
      <div>Price: {props.price}</div>
    </div>
  );
};

export default CarouselItem;
