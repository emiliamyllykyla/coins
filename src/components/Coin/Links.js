import LinksRow from "./LinksRow";
import "../../styles/Links.css"

const Links = ({ data }) => {
  const links = data.data.links;
  const homepages = links.homepage.filter((item) => item !== "");
  const coingecko = [`https://www.coingecko.com/en/coins/${data.data.id}`];
  const reddit =
  links.subreddit_url && (links.subreddit_url !== "https://www.reddit.com")
      ? [links.subreddit_url]
      : [] 

  return (
    <div className="coin-links">
      <h2>Links</h2>
      <table className="coin-table">
        <tbody>
          <LinksRow header={"Homepage"} data={homepages} />
          <LinksRow header={"Coingecko"} data={coingecko} />
          <LinksRow header={"Reddit"} data={reddit} />
        </tbody>
      </table>
    </div>
  );
};

export default Links;
