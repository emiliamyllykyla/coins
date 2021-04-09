import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import Loading from "./components/common/Loading";
import Coins from "./components/Coins/Coins"

import { getCoinList } from "./functions/coingecko";
import { getWalletData, getPriceData } from "./functions/binance";
import { makeTable } from "./functions/table";
import { calcCurrTotal } from "./functions/calc";
import { sortArr } from "./functions/utils";


function CoinsPage() {
  const [data, setData] = useState(null);
  const [asc, setAsc] = useState(true);

  useEffect(() => {
    Promise.all([getWalletData(), getPriceData(), getCoinList()])
      .then(([walletData, priceData, coinList]) => {
        if (!walletData || !priceData) {
          setData({ error: "No data was found" });
        } else {
          return makeTable(walletData, priceData, coinList);
        }
      })
      .then((table) =>
        setData({
          table,
          total: calcCurrTotal(table),
        })
      )
      .catch((error) => console.log(error));
  }, []);

  const sort = (arr, sortBy) => {
    setData({ ...data, table: sortArr(arr, sortBy, asc) });
    setAsc(!asc);
  };

  if (!data) return <Loading />;
  return (
    <>
      {data.error ? (
        <Redirect to="/" />
      ) : (
        <Coins data={data} sort={sort}/>
      )}
    </>
  );
}

export default CoinsPage;
