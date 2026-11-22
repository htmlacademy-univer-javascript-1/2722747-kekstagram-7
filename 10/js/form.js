import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';

const form = document.querySelector('.img-upload__form');
const fileInput = form.querySelector('.img-upload__input');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = form.querySelector('.img-upload__cancel');
const hashtags = form.querySelector('.text__hashtags');
const description = form.querySelector('.text__description');
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'text__error'
});

const getHashtags = (value) => value.trim() ? value.trim().split(/\s+/) : [];

pristine.addValidator(hashtags, (value) => getHashtags(value).every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag)), 'Неверный хэш-тег');
pristine.addValidator(hashtags, (value) => getHashtags(value).length <= 5, 'Не больше пяти хэш-тегов');
pristine.addValidator(hashtags, (value) => {
  const tags = getHashtags(value).map((tag) => tag.toLowerCase());
  return new Set(tags).size === tags.length;
}, 'Хэш-теги не должны повторяться');
pristine.addValidator(description, (value) => value.length <= 140, 'Не больше 140 символов');

const closeForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  form.reset();
  resetScale();
  resetEffects();
  pristine.reset();
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && document.activeElement !== hashtags && document.activeElement !== description) {
    evt.preventDefault();
    closeForm();
  }
}

const onFileInputChange = () => {
  if (fileInput.files.length === 0) {
    return;
  }
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const onCloseButtonClick = () => closeForm();
const onFormSubmit = (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
};

fileInput.addEventListener('change', onFileInputChange);
closeButton.addEventListener('click', onCloseButtonClick);
form.addEventListener('submit', onFormSubmit);
