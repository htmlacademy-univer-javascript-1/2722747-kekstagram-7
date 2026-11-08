const COMMENTS_PER_PORTION = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentTemplate = commentsContainer.querySelector('.social__comment').cloneNode(true);
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCounter = bigPicture.querySelector('.social__comment-count');
const shownCommentsCounter = bigPicture.querySelector('.comments-shown');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let currentComments = [];
let shownCommentsCount = 0;

const renderComments = () => {
  const fragment = document.createDocumentFragment();
  const nextComments = currentComments.slice(shownCommentsCount, shownCommentsCount + COMMENTS_PER_PORTION);

  nextComments.forEach(({avatar, name, message}) => {
    const comment = commentTemplate.cloneNode(true);
    const image = comment.querySelector('.social__picture');

    image.src = avatar;
    image.alt = name;
    comment.querySelector('.social__text').textContent = message;
    fragment.append(comment);
  });

  commentsContainer.append(fragment);
  shownCommentsCount += nextComments.length;
  shownCommentsCounter.textContent = shownCommentsCount;
  commentsLoader.classList.toggle('hidden', shownCommentsCount === currentComments.length);
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
  currentComments = comments;
  shownCommentsCount = 0;
  commentsContainer.innerHTML = '';
  renderComments();

  commentsCounter.classList.remove('hidden');
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

closeButton.addEventListener('click', closeBigPicture);
commentsLoader.addEventListener('click', renderComments);

export {openBigPicture};
