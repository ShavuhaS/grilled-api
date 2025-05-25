const getTimeConstants = (secondSize: number) => {
  const SECOND = secondSize;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const WEEK = 7 * DAY;
  const FORTNIGHT = 2 * WEEK;

  return { SECOND, MINUTE, HOUR, DAY, WEEK, FORTNIGHT };
};

export const milliseconds = getTimeConstants(1000);

export const seconds = getTimeConstants(1);
