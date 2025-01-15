import { BookmarksWrapper } from '@/components/shared';
import { AxiosError, AxiosHeaders } from 'axios';
import { cookies } from 'next/headers';
import { TokensEnum } from '../../../../@types';
import { Api } from '@/services/api-client';

export default async function Bookmarks() {
  try {
    const cookiesStore = await cookies();
    const headers = new AxiosHeaders({
      Authorization: `Bearer ${cookiesStore.get(TokensEnum.JWT)?.value}`,
    });
    const bookmarks = await Api.bookmark.findAllBookmarks({ headers });
    return <BookmarksWrapper initialData={bookmarks} />;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      console.log(error);
    }
    console.log(error);
    return <div>Error occurred</div>;
  }
}
