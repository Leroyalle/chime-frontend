import { InfiniteData } from '@tanstack/react-query';
import { InfinityResponse } from '../../../../../@types/response';
import { Post } from '../../../../../@types/dto';

type TData = InfiniteData<InfinityResponse<Post[]>, unknown> | undefined;
export const toggleBookmark = (postId: string, data: TData, action: 'add' | 'remove') => {
  console.log(data);
  if (!data) {
    return undefined;
  }

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      data: page.data.map((p) =>
        p.id === postId
          ? {
              ...p,
              isBookmarked: action === 'add',
            }
          : p,
      ),
    })),
  };
};
