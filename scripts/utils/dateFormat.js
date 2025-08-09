import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function getDateFormat(dateString, stringFormat){
  const date = dayjs(dateString);
  const dateFormat = date.format(stringFormat);

  return dateFormat;
}