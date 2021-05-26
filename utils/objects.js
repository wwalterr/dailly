const removeObjectKey = (key, { [key]: omit, ...rest }) => rest;

export default removeObjectKey;
