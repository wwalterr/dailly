const pad = (datePart) => {
  return datePart < 10 ? "0" + datePart : datePart;
};

const ISODateString = (date) =>
  date.getUTCFullYear() +
  "-" +
  pad(date.getUTCMonth() + 1) +
  "-" +
  pad(date.getUTCDate()) +
  "T" +
  pad(date.getUTCHours()) +
  ":" +
  pad(date.getUTCMinutes()) +
  ":" +
  pad(date.getUTCSeconds()) +
  "Z";

export default ISODateString;
