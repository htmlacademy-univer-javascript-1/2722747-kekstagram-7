const scaleValue = document.querySelector('.scale__control--value');
const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const preview = document.querySelector('.img-upload__preview img');

const setScale = (value) => {
  scaleValue.value = `${value}%`;
  preview.style.transform = `scale(${value / 100})`;
};

const onSmallerButtonClick = () => setScale(Math.max(25, parseInt(scaleValue.value, 10) - 25));
const onBiggerButtonClick = () => setScale(Math.min(100, parseInt(scaleValue.value, 10) + 25));
const resetScale = () => setScale(100);

smallerButton.addEventListener('click', onSmallerButtonClick);
biggerButton.addEventListener('click', onBiggerButtonClick);

export {resetScale};
