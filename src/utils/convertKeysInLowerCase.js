const lowerKeysObject = (inputObject) => Object.fromEntries(
    Object.entries(inputObject).map(([key, value]) => [key.toLowerCase(), value])
);

module.exports = {
    lowerKeysObject
}