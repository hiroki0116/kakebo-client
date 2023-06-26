export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const camelCaseAll = (str: string) => {
  return str
    .trim()
    .split(' ')
    .map((w) => capitalizeFirstLetter(w))
    .join(' ');
};

export const camelCase = (str: string) =>
  str && str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
