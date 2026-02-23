import type { News, BlogPost, ContactInquiry, Upload, User } from "@/generated/prisma/client";

export type NewsWithAuthor = News & {
  author: Pick<User, "name">;
};

export type BlogPostWithAuthor = BlogPost & {
  author: Pick<User, "name">;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  totalPages: number;
  currentPage: number;
};

export type ActionState = {
  errors?: Record<string, string[]>;
  message?: string;
  success?: boolean;
};

export type { News, BlogPost, ContactInquiry, Upload, User };
