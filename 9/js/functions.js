const checkStringLength = (string, maxLength) => string.length <= maxLength;

const isPalindrome = (string) => {
  const normalizedString = string.toLowerCase().split(' ').join('');

  for (let i = 0; i < normalizedString.length / 2; i++) {
    if (normalizedString[i] !== normalizedString[normalizedString.length - 1 - i]) {
      return false;
    }
  }

  return true;
};

const getTimeInMinutes = (time) => {
  const [hours, minutes] = time.split(':');
  return Number(hours) * 60 + Number(minutes);
};

const isMeetingWithinWorkday = (workdayStart, workdayEnd, meetingStart, duration) => {
  const start = getTimeInMinutes(meetingStart);
  const end = start + duration;

  return start >= getTimeInMinutes(workdayStart) && end <= getTimeInMinutes(workdayEnd);
};

// Проверка длины строки
checkStringLength('проверяемая строка', 20); // true
checkStringLength('проверяемая строка', 18); // true
checkStringLength('проверяемая строка', 10); // false

// Проверка палиндромов
isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл '); // true

isMeetingWithinWorkday('08:00', '17:30', '14:00', 90);
isMeetingWithinWorkday('8:0', '10:0', '8:0', 120);
isMeetingWithinWorkday('08:00', '14:30', '14:00', 90);
isMeetingWithinWorkday('14:00', '17:30', '08:0', 90);
isMeetingWithinWorkday('8:00', '17:30', '08:00', 900);
