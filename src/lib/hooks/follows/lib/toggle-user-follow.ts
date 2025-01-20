import { UserResponse } from '../../../../../@types/response';

type TData = UserResponse | undefined;

export const toggleUserFollow = (data: TData, action: 'follow' | 'unFollow') => {
  if (!data) {
    return undefined;
  }
  return {
    ...data,
    user: {
      ...data.user,
      isFollowing: action === 'follow',
      followerCount:
        action === 'follow' ? data.user.followerCount + 1 : data.user.followerCount - 1,
    },
  };
};
