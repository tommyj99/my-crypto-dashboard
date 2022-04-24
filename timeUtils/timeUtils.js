// new Date format: "Sat Dec 04 2021 00:00:00"

export function convertUnixToDate(unixTime) {
  const date = new Date(unixTime * 1000);
  return date;
}

export function convertDateToUnix(date) {
  var unixTimestamp = Math.floor(date / 1000);
  return unixTimestamp;
}

function unixStartTime(unixTopOfHour) {
  unixTopOfHour -= 3600 * 23;
  return unixTopOfHour;
}

function unixToSubtractToFindTopOfHour(date) {
  let unixToSubtract = 0;
  let minute = date.getMinutes();
  if (minute > 0) {
    unixToSubtract = minute * 60;
  }
  return unixToSubtract;
}

export function unixStartAndEndTimes(date) {
  const startAndEndTimes = {
    startTime: null,
    endTime: null,
  };
  let unixTopOfHour;
  startAndEndTimes.endTime = convertDateToUnix(date);
  let unixToSubtract = unixToSubtractToFindTopOfHour(date);
  // 23 hour
  unixTopOfHour = startAndEndTimes.endTime - unixToSubtract;
  startAndEndTimes.endTime = unixTopOfHour;
  startAndEndTimes.startTime = unixStartTime(unixTopOfHour);
  return startAndEndTimes;
}

export function unixStartAndEndTimesLastCandle(date) {
  const startAndEndTimes = {
    startTime: null,
    endTime: null,
  };
  startAndEndTimes.endTime = convertDateToUnix(date);
  let unixToSubtract = unixToSubtractToFindTopOfHour(date);
  if (unixToSubtract === 0) {
    unixToSubtract = 3600;
  }
  startAndEndTimes.startTime = startAndEndTimes.endTime - unixToSubtract;
  // startAndEndTimes.endTime = convertDateToUnix(date);
  return startAndEndTimes;
}
