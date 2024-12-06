export type User = {
  id: string;
  email: string;
  password: string;
  name: string;
  avatarUrl?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  updatedAt: Date;
  bio?: string;
  location?: string;
  posts: Post[];
  following: Follows[];
  followers: Follows[];
  likes: Like[];
  comments: Comment[];
  isFollowing?: boolean;
};

export type Follows = {
  id: string;
  follower: User;
  followerId: string;
  following: User;
  followingId: string;
};

export type Post = {
  id: string;
  content: string;
  imageUrl?: string;
  author: User;
  authorId: string;
  likes: Like[];
  comments: Comment[];
  isLiked: boolean;
  likesCount: number;
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Like = {
  id: string;
  user: User;
  userId: string;
  post: Post;
  postId: string;
};

export type Comment = {
  id: string;
  content: string;
  user: User;
  userId: string;
  post: Post;
  postId: string;
};
