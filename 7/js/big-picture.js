const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment').cloneNode(true);
const closeButton = bigPicture.querySelector('.big-picture__cancel');

const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();

  comments.forEach(({avatar, name, message}) => {
    const comment = commentTemplate.cloneNode(true);
    const image = comment.querySelector('.social__picture');

    image.src = avatar;
    image.alt = name;
    comment.querySelector('.social__text').textContent = message;
    fragment.append(comment);
  });

  commentsContainer.innerHTML = '';
  commentsContainer.append(fragment);
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
}

const openBigPicture = ({url, description, likes, comments}) => {
  bigPictureImage.src = url;
  bigPictureImage.alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  renderComments(comments);

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

closeButton.addEventListener('click', closeBigPicture);

export {openBigPicture};
