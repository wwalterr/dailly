const convertYearMonthDay = (date) =>
  new Date(date).toISOString().split("T")[0].replace(/-/g, "-");

export default convertYearMonthDay;
