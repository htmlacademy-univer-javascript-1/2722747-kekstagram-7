const effects = {
  chrome: {filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: ''},
  sepia: {filter: 'sepia', min: 0, max: 1, step: 0.1, unit: ''},
  marvin: {filter: 'invert', min: 0, max: 100, step: 1, unit: '%'},
  phobos: {filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px'},
  heat: {filter: 'brightness', min: 1, max: 3, step: 0.1, unit: ''}
};

const preview = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
let currentEffect = 'none';

noUiSlider.create(slider, {
  range: {min: 0, max: 1},
  start: 1,
  step: 0.1,
  connect: 'lower'
});

const onSliderUpdate = (values, handle) => {
  if (currentEffect === 'none') {
    return;
  }
  const value = Number(values[handle]);
  const effect = effects[currentEffect];
  effectValue.value = value;
  preview.style.filter = `${effect.filter}(${value}${effect.unit})`;
};

const setEffect = (name) => {
  currentEffect = name;
  sliderContainer.classList.toggle('hidden', name === 'none');
  if (name === 'none') {
    preview.style.filter = '';
    effectValue.value = '';
    return;
  }
  const effect = effects[name];
  slider.noUiSlider.updateOptions({
    range: {min: effect.min, max: effect.max},
    step: effect.step,
    start: effect.max
  });
};

const onEffectsListChange = (evt) => {
  if (evt.target.matches('.effects__radio')) {
    setEffect(evt.target.value);
  }
};

const resetEffects = () => setEffect('none');

slider.noUiSlider.on('update', onSliderUpdate);
effectsList.addEventListener('change', onEffectsListChange);
resetEffects();

export {resetEffects};
