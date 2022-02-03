export const transformPhoneNumber = (phoneNumber: string): string => {
  const pattern = '+# (###) ###-##-##';
  const phoneNumberAsArray = phoneNumber.split('').filter(v => /[0-9]/.test(v));

  if (!phoneNumberAsArray.length) {
    return '';
  }

  const transformedPhoneNumber = phoneNumberAsArray.reduce(
    (res, cur, i, { length }) => {
      const replacedIndex = res.indexOf('#');
      res = res.replace('#', cur);

      if (i === length - 1) {
        res = res.slice(0, replacedIndex + 1);
      }

      return res;
    },
    pattern
  );

  return transformedPhoneNumber;
};
