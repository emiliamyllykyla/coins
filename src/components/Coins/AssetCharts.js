import AssetAllocation from "./AssetAllocation";
import AssetNetWorth from "./AssetNetWorth";
import AssetWorthByCoin from "./AssetWorthByCoin";
import "../../styles/AssetCharts.css";

const AssetCharts = ({ data }) => {
  return (
    <div className="chart-row">
      <AssetAllocation data={data} />
      <AssetNetWorth data={data} />
      <AssetWorthByCoin data={data} />
    </div>
  );
};

export default AssetCharts;
