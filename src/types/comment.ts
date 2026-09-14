export interface CommentAuthor {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
}

export interface Comment {
  id: number;
  content: string;
  timestamp: string;
  userId: number;
  postId: number;
  user: CommentAuthor;
}
