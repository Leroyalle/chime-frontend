import { Post } from './dto';

export type PostsDto = {
  data: Post[];
  currentPage: number;
  totalPages: number;
};
