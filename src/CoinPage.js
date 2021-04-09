import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Coin from "./components/Coin/Coin";
import Loading from "./components/common/Loading";
import Error from "./components/common/Error"
import { getCoinData, getMarketChart } from "./functions/coingecko";


function CoinPage() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [error, setError] = useState({ status: null, message: "" });

  useEffect(() => {
    Promise.all([getCoinData(coinId), getMarketChart(coinId)])
      .then(([data, candleData]) => {
        if (!data.error) {
          setCoinData({ data, candleData });
        } else {
          setError({status: 404, message: data.error})
        }
      })
      .catch((error) => console.log(error));
  }, [coinId]);

  if (error.status) return <Error error={error}/>
  if (!coinData) return <Loading />;
  
  return <Coin data={coinData} />;
}

export default CoinPage;
