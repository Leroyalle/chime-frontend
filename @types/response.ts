import { Post } from './dto';
import { Comment } from './newDto';

export type PostsDto = {
  data: Post[];
  currentPage: number;
  totalPages: number;
};

export type CommentsDto = {
  data: Comment[];
  currentPage: number;
  totalPages: number;
};
