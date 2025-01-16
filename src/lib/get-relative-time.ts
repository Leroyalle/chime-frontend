import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export const getRelativeTime = (date: Date) => {
  return dayjs.extend(relativeTime), dayjs(date).fromNow();
};
