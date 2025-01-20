import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export const getRelativeTime = (date?: Date | null) => {
  if (!date) {
    return undefined;
  }
  return dayjs.extend(relativeTime), dayjs(date).fromNow();
};
