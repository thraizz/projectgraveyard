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
  _id: string;
  projectId: string;
  userId: string; // owner's user ID
  title: string;
  description: string;
  tags: string[];
  images: string[]; // store links or references
  textContent: string;
  upvotes: string[];
  createdAt: Date;
  updatedAt?: Date;
  links?: string[];
  logo: string;
};

// Comment Type
export type Comment = {
  _id: string;
  userId: string; // author's user ID
  projectId: string; // associated project ID
  textContent: string;
  timestamp: Date;
  upvotes: string[];
};

// Database Collections
export interface DatabaseCollections {
  users: Record<string, User>;
  projects: Record<string, Project>;
  comments: Record<string, Comment>;
}
