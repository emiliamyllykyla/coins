export const sortArr = (arr, sortBy, asc) => {
  return [...arr].sort((a, b) => {
    if (a[sortBy] > b[sortBy]) {
      return asc ? 1 : -1;
    } else {
      return asc ? -1 : 1;
    }
  });
};

export const formatUsd = (number, min = 0, max = 20) => {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: min,
    maximumFractionDigits: max,
  });
  return formatter.format(number);
};

export const truncateString = (str, lim) => {
  if (str.length > lim) {
    return str.slice(0, lim) + "..."
  }
  return str
}

export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const zipWith = (combine, xs, ys) =>
  ys.length < xs.length
    ? zipWith(combine, xs.slice(0, ys.length), ys)
    : xs.map((x, i) => combine(x, ys[i]));
