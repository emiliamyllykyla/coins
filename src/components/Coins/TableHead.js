import { FaSort } from "react-icons/fa";

const TableHead = ({ data, sort }) => {
  return (
    <thead>
      <tr>
        {[
          "Coin",
          "Balance",
          "Value",
          "Price",
          "24h Change",
          "24h High",
          "24h Low",
          "24h Volume",
          "Market Cap",
        ].map((item, index) => (
          <th key={index} style={{ textAlign: index === 0 && "left" }}>
            {item}
            <button
              onClick={() => sort(data.table, index)}
              className="sort-btn"
            >
              <FaSort />
            </button>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
