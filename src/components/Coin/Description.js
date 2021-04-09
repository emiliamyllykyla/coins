import { useState } from "react";
import { truncateString } from "../../functions/utils";
import "../../styles/Description.css";

const Description = ({ data }) => {
  const [truncated, setTruncated] = useState(true);
  const desc = data.data.description.en
    ? data.data.description.en
    : "No description available.";
  const html = truncated ? `${truncateString(desc, 500)}` : `${desc}`;

  return (
    <div className="description">
      <div className="description-text" dangerouslySetInnerHTML={{ __html: html }} />
      {html.length > 500 && (
        <button
          className="showmore-btn"
          onClick={() => setTruncated(!truncated)}
        >
          {truncated ? "Show more" : "Show less"}
        </button>
      )}
    </div>
  );
};

export default Description;
