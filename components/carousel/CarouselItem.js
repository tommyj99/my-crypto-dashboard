import { Paper } from "@mui/material";
import { Typography } from "@mui/material";

const CarouselItem = (props) => {
  return (
    // <a href="">
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "black",
        marginLeft: "3px",
        borderRadius: "10px",
        minHeight: "160px",
      }}
    >
      <Typography color="#fff8dc">{props.coin}</Typography>
      <div
        style={{
          backgroundColor: "gray",
          borderRadius: "5px",
          padding: "2px",
        }}
      >
        {props.image}
      </div>
      <Typography color="#fff8dc">Rank: {props.rank}</Typography>
      <Typography color="#fff8dc">SYM: {props.symbol}</Typography>
      <Typography color="#fff8dc">Price: {props.price}</Typography>
    </div>
    // </a>
  );
};

export default CarouselItem;
