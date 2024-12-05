import axios from 'axios';
import { ApiRouter } from './constants';
import { Post } from '../../@types/dto';

export const createPost = async (data: { postData: FormData }): Promise<Post> => {
  return (await axios.post<Post>(ApiRouter.POST, data)).data;
};

export const getAllPosts = async (skip: number, take: number): Promise<Post[]> => {
  return (await axios.get<Post[]>(`${ApiRouter.POST}?skip=${skip}&take=${take}`)).data;
};

export const getPostById = async (id: string): Promise<Post> => {
  return (await axios.get<Post>(`${ApiRouter.POST}/${id}`)).data;
};

export const deletePost = async (id: string): Promise<void> => {
  return (await axios.delete<void>(`${ApiRouter.POST}/${id}`)).data;
};
