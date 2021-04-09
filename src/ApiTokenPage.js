import { useState } from "react";
import { Redirect } from "react-router-dom";
import "./styles/Apitoken.css";

function ApiTokenPage() {
  const [result, setResult] = useState({});
  const [keys, setKeys] = useState({
    APIKEY: "",
    APISECRET: "",
  });

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const formData = new FormData(ev.target);

    fetch("/auth", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((json) => setResult(json))
      .catch((err) => setResult({ error: "Request failed" }));
  };

  const onChange = (e) => {
    setKeys({ ...keys, [e.target.name]: e.target.value });
  };

  return (
    <div className="token-container">
      {result.success && <Redirect to="/coins" />}
      <div className="token">
        <form onSubmit={handleSubmit}>
          <h1>Enter your Binance API key</h1>
          <div className="alert alert-warning">
            <i>
              You should make sure your API KEY only has read access enabled!
            </i>
          </div>
          {result.error && (
            <div className="alert alert-error">
              <i>{result.error}</i>
            </div>
          )}
          <label>
            API Key:
            <input
              name="APIKEY"
              type="text"
              value={keys.APIKEY}
              onChange={onChange}
            />
          </label>
          <label>
            Secret Key:
            <input
              name="APISECRET"
              type="text"
              value={keys.APISECRET}
              onChange={onChange}
            />
          </label>
          <input type="submit" value="Save" />
        </form>

        <div className="alert alert-info">
          <i>
            The keys will only be stored in your browsers cookies. Your keys are
            not stored on the server.
          </i>
        </div>
      </div>
    </div>
  );
}

export default ApiTokenPage;
