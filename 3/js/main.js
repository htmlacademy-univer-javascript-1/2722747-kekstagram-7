const PHOTO_COUNT = 25;

const NAMES = ['Артём', 'Анна', 'Егор', 'Мария', 'Иван', 'Ольга', 'Максим', 'Алиса'];

const DESCRIPTIONS = [
  'Хороший день для прогулки',
  'Фото на память',
  'Небольшое путешествие',
  'Мой любимый вид',
  'Выходной с друзьями',
  'Хочется вернуться сюда ещё раз'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getRandomArrayElement = (items) => items[getRandomInteger(0, items.length - 1)];

const createMessage = () => Array.from(
  {length: getRandomInteger(1, 2)},
  () => getRandomArrayElement(MESSAGES)
).join(' ');

let commentId = 0;

const createComment = () => {
  commentId += 1;

  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(NAMES)
  };
};

const createPhoto = (id) => ({
  id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(15, 200),
  comments: Array.from({length: getRandomInteger(0, 30)}, createComment)
});

const createPhotos = () => Array.from({length: PHOTO_COUNT}, (_, index) => createPhoto(index + 1));

createPhotos();
