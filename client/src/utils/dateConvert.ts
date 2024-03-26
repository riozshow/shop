const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
} as Intl.DateTimeFormatOptions;

export const dateConvert = {
  date: (date: string) => new Date(date).toLocaleString('pl-PL', options),
  time: (date: string) => new Date(date).toLocaleTimeString('pl-PL'),
};
