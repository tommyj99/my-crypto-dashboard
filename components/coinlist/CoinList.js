import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import {
  selectCoinsMCap,
  selectCoinsMCapStatus,
  selectCoinsMCapError,
} from "../../redux/selectors";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import CarouselItem from "../carousel/CarouselItem";

const CoinList = () => {
  const coinsMCapSelector = useSelector(selectCoinsMCap);
  const coinsMCapStatusSelector = useSelector(selectCoinsMCapStatus);
  const coinsMCapErrorMessageSelector = useSelector(selectCoinsMCapError);
  const [topFifty, setTopFifty] = React.useState([]);
  let coinNumber = 1;

  // take only top 50
  React.useEffect(() => {
    setTopFifty([]);
    coinsMCapSelector.forEach((item) => {
      if (item.market_cap_rank <= 50) {
        setTopFifty((topFifty) => [...topFifty, item]);
      }
    });
  }, []);

  function sortTopFifty(a, b) {
    return a.market_cap_rank < b.market_cap_rank;
  }

  // React.useEffect(() => {
  //   topFifty.sort(function (a, b) {
  //     return a.market_cap_rank < b.market_cap_rank;
  //   });
  // });

  const items = topFifty.sort(sortTopFifty).map((coinsMCap, index) => {
    const imageMed = coinsMCap.image.replace("large", "small");
    return (
      <div
        key={index}
        style={{
          paddingTop: "5px",
          paddingBottom: "5px",
          paddingRight: "5px",
          backgroundColor: "gray",
        }}
      >
        <CarouselItem
          rank={coinsMCap.market_cap_rank}
          coin={coinsMCap.name}
          symbol={coinsMCap.symbol}
          image={<img src={imageMed} />}
          price={coinsMCap.current_price}
        ></CarouselItem>
      </div>
    );
  });

  const responsive = {
    50: {
      items: 4,
    },
  };

  if (
    coinsMCapStatusSelector === "loading" ||
    coinsMCapStatusSelector === "idle"
  ) {
    return (
      <div>
        <Spinner />
      </div>
    );
  } else if (coinsMCapStatusSelector === "succeeded") {
    console.log("items: ", items);
    return (
      <div>
        <AliceCarousel
          infinite
          responsive={responsive}
          mouseTracking
          autoPlayInterval={1000}
          animationDuration={1500}
          items={items}
          autoPlay
          disableDotsControls
        />
      </div>
    );
  } else if (coinsMCapStatusSelector === "failed") {
    return (
      <div>
        <h1>{coinsMCapErrorMessageSelector}</h1>
      </div>
    );
  }
};

export default React.memo(CoinList);
