const limitText = (text, range = 10) => {
  return `${text.substr(0, range)}${text.length > range ? "..." : ""}`;
};

const capitalize = (text) => text[0].toUpperCase() + text.slice(1);

export { limitText, capitalize };
