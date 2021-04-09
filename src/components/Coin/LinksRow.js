const LinksRow = ({ header, data }) => {
  return (
    <>
      {data.length > 0 && (
        <tr>
          <th>{header}</th>
          <td>
            {data.map((item, index) => (
              <a className="coin-link" href={item} key={index}>
                {item}
              </a>
            ))}
          </td>
        </tr>
      )}
    </>
  );
};

export default LinksRow;
