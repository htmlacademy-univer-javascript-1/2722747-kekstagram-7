import {openBigPicture} from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictures = (photos) => {
  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const {url, description, likes, comments} = photo;
    const picture = pictureTemplate.cloneNode(true);
    const image = picture.querySelector('.picture__img');

    image.src = url;
    image.alt = description;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;

    picture.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photo);
    });

    fragment.append(picture);
  });

  picturesContainer.append(fragment);
};

export {renderPictures};
