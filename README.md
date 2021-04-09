<p align="center">
  <img height="400" src="https://user-images.githubusercontent.com/63544185/135657819-797c7254-85eb-42be-a17b-0128ce713c3c.png"/>
</p>

<h1 align="center">Coins - Binance Portfolio Tracker </h1>

Coins is a colorful [Binance](https://www.binance.com/) crypto wallet tracker! 
* **Login** - provide your Binance API keys to track your wallet data
* **Home** - view total balance, balance of each asset, 24h price changes and more
* **Coin** - view detailed information of an asset, for example a 7-day price chart and a description

<h2>Technologies</h2>

* This project is written in [ReactJS](https://reactjs.org/)
* [Create React App](https://github.com/facebook/create-react-app) was used to create the project
* [Node Binance API](https://www.npmjs.com/package/node-binance-api) is used to get wallet balances, coin prices and candlestick chart data
   * APIKEY and SECRET KEY are stored as cookies
* [CoinGecko API](https://www.coingecko.com/en/api) is used to get some additional crypto data
* [Express.js](https://expressjs.com/) is used to create a server
* [Recharts](https://www.npmjs.com/package/recharts) is used to display data in multiple different charts

<h2>Run the app</h2>

* `node server/server.js` in project directory runs the server
* `npm start`in project directory runs the app in the development mode
