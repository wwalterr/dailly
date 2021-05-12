const limitText = (text, range = 10) => {
  return `${text.substr(0, range)}${text.length > range ? "..." : ""}`;
};

export { limitText };
