import { Link } from "react-router-dom";
import { FaCoins } from "react-icons/fa";
import "../../styles/Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-items">
        <Link to={`/coins`} className="header-link">
          <FaCoins className="header-icon" />
          <h1>Mina mynt</h1>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to={`/coins`} className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/"} className="nav-link">
                Change keys
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
