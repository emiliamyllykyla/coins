const express = require("express");
const Binance = require("node-binance-api");
const cookieParser = require("cookie-parser");
var multer = require("multer");
var upload = multer();

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
// for parsing multipart/form-data
app.use(upload.array());
app.use(express.static("public"));

const PORT = 8585;

const getCookies = (cookie) =>
  cookie &&
  Object.fromEntries(
    cookie
      .split(";")
      .filter((s) => s !== "")
      .map((s) => s.split("=").map((s) => s.trim()))
  );

const getAPI = (req) => {
  const cookies = getCookies(req.headers.cookie);
  if (cookies)
    return new Binance().options({
      APIKEY: cookies.APIKEY,
      APISECRET: cookies.APISECRET,
    });
};

app.listen(PORT, () => {
  console.log("running on localhost:" + PORT);
});

app.post("/auth", async (req, res) => {
  if (req.body.APIKEY === "" || req.body.APISECRET === "") {
    res.json({ error: "Please enter a value for both fields." });
  } else if (req.body.APIKEY.length != 64 || req.body.APISECRET.length != 64) {
    res.json({ error: "Please enter keys in valid format." });
  } else {
    const binance = new Binance().options({
      APIKEY: req.body.APIKEY,
      APISECRET: req.body.APISECRET,
    });

    // Test request to make sure the API keys are not faulty
    const testRequest = binance.balance((error, balance) => {
      if (error)
        return res.json({ error: "Invalid API key and/or secret key." });
      // Set the APIKEY and APISECRET as cookies in the browser.
      // When the browser calls the server it will forward the keys as cookie headers.
      // Then we can use those to call Binance.
      else {
        res.cookie("APIKEY", req.body.APIKEY, { httpOnly: true });
        res.cookie("APISECRET", req.body.APISECRET, { httpOnly: true });
        res.json({ success: true });
      }
    });
  }
});

app.get("/data", async (req, res) => {
  const api = getAPI(req);
  if (api) return res.json(await api.balance());
  else return res.json(null);
});

app.get("/data/prices", async (req, res) => {
  const api = getAPI(req);
  if (api) return res.json(await api.prices());
  else return res.json(null);
});

app.get("/data/prices/week/:sym", async (req, res) => {
  getAPI(req).candlesticks(
    req.params.sym,
    "1d",
    (error, ticks, symbol) => {
      if (Array.isArray(ticks) && Array.isArray(ticks[0])) {
        const array = ticks.map((tick) => ({
          time: tick[0],
          prices: { open: tick[1], close: tick[4] },
        }));

        res.json(array);
      } else {
        res.json(null);
      }
    },
    { limit: 8 }
  );
});
