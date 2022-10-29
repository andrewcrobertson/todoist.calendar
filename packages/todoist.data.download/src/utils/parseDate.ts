import { split } from 'lodash';

type nilString = string | null | undefined;

export const parseDate = (date: nilString) => {
  const dateTokens = split(date, '-');
  const yearAndMonth = `${dateTokens[0]}-${dateTokens[1]}`;
  const day = dateTokens[2];
  return { yearAndMonth, day };
};
