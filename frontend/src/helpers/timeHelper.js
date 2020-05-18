export const secondsToTimeString = (seconds) => {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString()
    .substr(11, 8);
};

export const timeStringToSeconds = (hms) => {
  const a = hms.split(':');
  return (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
};
