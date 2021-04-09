import CoinsPage from "./CoinsPage";
import CoinPage from "./CoinPage";
import ApiTokenPage from "./ApiTokenPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/common/Header";

function App() {
  return (
    <>
      <Router>
        <Header />
        <div className="page">
          <Switch>
            <Route path="/coins/:coinId">
              <CoinPage />
            </Route>
            <Route path="/coins">
              <CoinsPage />
            </Route>
            <Route path="/">
              <ApiTokenPage />
            </Route>
          </Switch>
        </div>
      </Router>
      <footer>Powered by CoinGecko API and Ruusujuuri</footer>
    </>
  );
}

export default App;
