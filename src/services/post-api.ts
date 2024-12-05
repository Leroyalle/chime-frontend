import { ApiRouter } from './constants';
import { Post } from '../../@types/dto';
import { instance } from './instance';
import { AxiosRequestHeaders } from 'axios';
import { PostsDto } from '../../@types/response';

export const createPost = async (data: { postData: FormData }): Promise<Post> => {
  return (await instance.post<Post>(ApiRouter.POST, data)).data;
};

export const getAllPosts = async ({
  page,
  perPage,
  headers,
}: {
  page: number;
  perPage: number;
  headers?: AxiosRequestHeaders;
}): Promise<PostsDto> => {
  return (
    await instance.get<PostsDto>(`${ApiRouter.POST}?page=${page}&perPage=${perPage}`, { headers })
  ).data;
};

export const getPostById = async (id: string): Promise<Post> => {
  return (await instance.get<Post>(`${ApiRouter.POST}/${id}`)).data;
};

export const deletePost = async (id: string): Promise<void> => {
  return (await instance.delete<void>(`${ApiRouter.POST}/${id}`)).data;
};
