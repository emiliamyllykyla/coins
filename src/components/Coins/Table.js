import TableHead from "./TableHead";
import TableBody from "./TableBody";
import "../../styles/Table.css";


const Table = ({ data, sort }) => {
  return (
    <div className="table-container">
      <table>
        <TableHead data={data} sort={sort} />
        <TableBody data={data} />
      </table>
    </div>
  );
};

export default Table;
