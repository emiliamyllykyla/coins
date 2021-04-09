import CoinWeek from "./CoinWeek";
import Description from "./Description";
import CoinInfo from "./CoinInfo";
import Links from "./Links";
import CoinHeader from "./CoinHeader";
import "../../styles/Coin.css";

const Coin = ({ data }) => {
  return (
    <>
      <CoinHeader data={data} />
      <div className="col-container">
        <div className="col col-2">
          <CoinWeek data={data} />
          <Description data={data} />
        </div>
        <div className="col col-1">
          <CoinInfo data={data} />
          <Links data={data} />
        </div>
      </div>
    </>
  );
};

export default Coin;
