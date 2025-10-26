export const addTwoToAge = (age) => {
  if (isNaN(age) || !age) return;

  return age + 2;
};
