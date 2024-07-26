export const normalizeString = (string: string) => {
  return string
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
};

export const isSimilarByLevenshtein = (
  source: string,
  target: string,
  allowedDistance = 1,
) => {
  const sourceLength = source.length;
  const targetLength = target.length;
  const distanceMatrix = [];

  // Initialize the first row and column of the distance matrix
  for (let i = 0; i <= sourceLength; i++) {
    distanceMatrix[i] = [i];
  }

  for (let j = 1; j <= targetLength; j++) {
    distanceMatrix[0]![j] = j;
  }

  // Fill the distance matrix
  for (let i = 1; i <= sourceLength; i++) {
    for (let j = 1; j <= targetLength; j++) {
      const cost = source[i - 1] === target[j - 1] ? 0 : 1;
      distanceMatrix[i]![j] = Math.min(
        distanceMatrix[i - 1]![j]! + 1, // Deletion
        distanceMatrix[i]![j - 1]! + 1, // Insertion
        distanceMatrix[i - 1]![j - 1]! + cost, // Substitution
      );
    }
  }

  // The Levenshtein distance is the value in the bottom-right corner of the matrix
  const distance = distanceMatrix[sourceLength]![targetLength]!;

  return distance <= allowedDistance;
};

export const STOP_WORDS = [
  'a',
  'an',
  'and',
  'are',
  'as',
  'at',
  'be',
  'but',
  'by',
  'for',
  'if',
  'in',
  'into',
  'is',
  'it',
  'no',
  'not',
  'of',
  'on',
  'or',
  'such',
  'that',
  'the',
  'their',
  'then',
  'there',
  'these',
  'they',
  'this',
  'to',
  'was',
  'will',
  'with',
];
