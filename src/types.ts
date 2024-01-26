// User Type
export interface UserType {
  userId: string;
  username: string;
  email: string;
  password: string; // hashed
  profilePicture?: string;
  bio?: string;
}

// Project Type
export type Project = {
  projectId: string;
  userId: string; // owner's user ID
  title: string;
  description: string;
  tags: string[];
  images: string[]; // store links or references
  textContent: string;
  upvotesCount: number;
  comments: CommentType[];
  createdAt: Date;
  updatedAt?: Date;
};

// Comment Type
export interface CommentType {
  commentId: string;
  userId: string; // author's user ID
  projectId: string; // associated project ID
  textContent: string;
  timestamp: Date;
}

// Database Collections
export interface DatabaseCollections {
  users: Record<string, UserType>;
  projects: Record<string, ProjectType>;
  comments: Record<string, CommentType>;
}
