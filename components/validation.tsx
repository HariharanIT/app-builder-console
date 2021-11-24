export const strValidation = (regex: RegExp, value: string) => {
  return regex.test(value);
};
