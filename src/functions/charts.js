// Returns an array of strings representing days
// (e.g. ['12 Apr', '13 Apr', ...])
export const getDates = (msData) => {
  return msData
    .map((ms) => {
      const date = new Date(ms);
      const month = date.toLocaleString("en-US", { month: "short" });
      return `${date.getDate()} ${month}`;
    });
};

// Returns an array of strings representing date and time
// e.g. ['Fri Apr 22 2021, 00:03:16', ...]
export const getDateTimes = (msData) => {
  return msData.map((ms) => {
    const date = new Date(ms);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return `${date.toDateString()}, ${hours}:${minutes}:${seconds}`;
  });
};


export const tickFormatter = (number) => {
  if(number > 1000000000){
    return (number/1000000000).toString() + 'B';
  } else if(number > 1000000){
    return (number/1000000).toString() + 'M';
  } else if(number > 1000){
    return (number/1000).toString() + 'K';
  } else{
    return number.toString();
  }
}