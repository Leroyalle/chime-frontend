export interface Root {
  data: Post[];
  currentPage: number;
  totalPages: number;
}

export interface Post {
  id: number;
  content: string;
  imageUrl: string | null;
  authorId: number;
  createdAt: Date;
  author: Author;
  likes: Like[];
  comments: Comment[];
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
}

export interface Author {
  id: number;
  banned: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Like {
  id: number;
  userId: number;
  postId: number;
}

export interface Comment {
  id: number;
  content: string;
  userId: number;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
}
