import { Paper } from "@mui/material";
import { Typography } from "@mui/material";

const CarouselItem = (props) => {
  return (
    <a href="">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "black",
          marginLeft: "5px",
          borderRadius: "5px",
          minHeight: "160px",
        }}
      >
        <Typography variant="h6" color="white">
          {props.coin}
        </Typography>
        <div
          style={{
            backgroundColor: "gray",
            borderRadius: "5px",
            padding: "2px",
          }}
        >
          {props.image}
        </div>
        <Typography color="white">Rank: {props.rank}</Typography>
        <Typography color="white">Symbol: {props.symbol}</Typography>
        <Typography color="white">Price: {props.price}</Typography>
      </div>
    </a>
  );
};

export default CarouselItem;
