import { PostItem, LikeItem, MockUser, INITIAL_POSTS, INITIAL_LIKES } from './mockData';

// ---------------------------------------------------------------------------
// In-memory store
// ---------------------------------------------------------------------------
let posts: PostItem[] = [...INITIAL_POSTS];
let likes: LikeItem[] = [...INITIAL_LIKES];

// ---------------------------------------------------------------------------
// Public types — mirror the future real API response shape
// ---------------------------------------------------------------------------
export interface Post {
  postId: string;
  content: string;
  ownerName: string;
  ownerAvatar: string;
  createdAt: string;
  likeCount: number;
  liked: boolean;
}

export interface GetPostsResponse {
  posts: Post[];
  nextToken: string | null;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const PAGE_SIZE = 20;

function toPost(item: PostItem, userId: string): Post {
  return {
    postId: item.postId,
    content: item.content,
    ownerName: item.ownerName,
    ownerAvatar: item.ownerAvatar,
    createdAt: item.createdAt,
    likeCount: item.likeCount,
    liked: likes.some((l) => l.postId === item.postId && l.userId === userId),
  };
}

// ---------------------------------------------------------------------------
// Mock API — interfaces match the future real API
// ---------------------------------------------------------------------------

export async function getPosts(
  userId: string,
  limit = PAGE_SIZE,
  nextToken?: string,
): Promise<GetPostsResponse> {
  const sorted = [...posts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
  const offset = nextToken ? parseInt(nextToken, 10) : 0;
  const page = sorted.slice(offset, offset + limit);
  const newNextToken = offset + limit < sorted.length ? String(offset + limit) : null;
  return { posts: page.map((p) => toPost(p, userId)), nextToken: newNextToken };
}

export async function createPost(content: string, user: MockUser): Promise<Post> {
  const newPost: PostItem = {
    postId: `post-${Date.now()}`,
    content,
    ownerId: user.id,
    ownerName: user.name,
    ownerAvatar: user.avatarUrl,
    createdAt: new Date().toISOString(),
    likeCount: 0,
  };
  posts = [newPost, ...posts];
  return toPost(newPost, user.id);
}

export async function addLike(postId: string, userId: string): Promise<void> {
  if (likes.some((l) => l.postId === postId && l.userId === userId)) return;
  likes = [...likes, { postId, userId }];
  posts = posts.map((p) =>
    p.postId === postId ? { ...p, likeCount: p.likeCount + 1 } : p,
  );
}

export async function deleteLike(postId: string, userId: string): Promise<void> {
  if (!likes.some((l) => l.postId === postId && l.userId === userId)) return;
  likes = likes.filter((l) => !(l.postId === postId && l.userId === userId));
  posts = posts.map((p) =>
    p.postId === postId ? { ...p, likeCount: Math.max(0, p.likeCount - 1) } : p,
  );
}
