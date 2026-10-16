const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

export {getRandomInteger, getRandomArrayElement};
