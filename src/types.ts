// User Type
export type User = {
  userId: string;
  username: string;
  email: string;
  password: string; // hashed
  profilePicture?: string;
  bio?: string;
};

// Project Type
export type Project = {
  projectId: string;
  userId: string; // owner's user ID
  title: string;
  description: string;
  tags: string[];
  images: string[]; // store links or references
  textContent: string;
  upvotes: string[];
  comments: Comment[];
  createdAt: Date;
  updatedAt?: Date;
};

// Comment Type
export type Comment = {
  commentId: string;
  userId: string; // author's user ID
  projectId: string; // associated project ID
  textContent: string;
  timestamp: Date;
};

// Database Collections
export interface DatabaseCollections {
  users: Record<string, User>;
  projects: Record<string, Project>;
  comments: Record<string, Comment>;
}
