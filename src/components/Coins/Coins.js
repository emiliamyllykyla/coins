import Table from "./Table";
import WalletInfo from "./WalletInfo";
import AssetCharts from "./AssetCharts";


const Coins = ({ data, sort }) => {
    return (
        <>
          <WalletInfo data={data} />
          <Table data={data} sort={sort} />
          <AssetCharts data={data}/>
        </>
    )
}

export default Coins