import { isNil, last, split } from 'lodash';

type nilString = string | null | undefined;

export const parseTime = (dateTime: nilString) => {
  if (isNil(dateTime)) return '';
  const timeRaw = last(split(dateTime, 'T'));
  const timeTokens = split(timeRaw, ':');
  const time = `${timeTokens[0]}:${timeTokens[1]}`;
  return time;
};
