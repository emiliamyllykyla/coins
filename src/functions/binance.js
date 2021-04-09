export const getWalletData = () =>
  fetch("/data", { credentials: "include" })
    .then((r) => r.json())
    .then((res) => {
      if (res) {
        return Object.entries(res).filter(
          ([key, value]) => Number(value.available) > 0
        );
      } else {
        return res;
      }
    });

export const getPriceData = () =>
  fetch("/data/prices", { credentials: "include" }).then((r) => r.json());
