const limitText = (text, range = 10) =>
  `${text.substr(0, range)}${text.length > range ? "..." : ""}`;

const capitalize = (text) => `${text[0].toUpperCase()}${text.slice(1)}`;

const removeBreakLines = (text) => text.replaceAll(/[\n\r]/g, " ");

export { limitText, capitalize, removeBreakLines };
