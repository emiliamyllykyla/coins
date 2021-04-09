import { Columns } from "./table";

const Days = {
    TODAY: -1,
    YESTERDAY: -2
}

const sum = (xs) => xs.reduce((a, b) => a + b, 0);
const index = (xs, i) => (i < 0 ? xs[xs.length + i] : xs[i]);

const calcTotal = (table, i) =>
  sum(
    table.map(
      (row) =>
        index(row[Columns.LAST_WEEK_CANDLES], i).price *
        row[Columns.BALANCE]
    )
  );

// current total - open today
export const calcChange = (table) =>
  calcCurrTotal(table) - calcTotal(table, Days.TODAY);

// open today - open yesterday
export const calcPnlYesterday = (table) => {
  return calcTotal(table, Days.TODAY) - calcTotal(table, Days.YESTERDAY);
};

export const calcCurrTotal = (table) =>
  sum(table.map((item) => item[Columns.MARKET_VALUE]));
