import { beforeEach, describe, expect, it, vi } from 'vitest';
import { INITIAL_LIKES, INITIAL_POSTS, MOCK_USERS } from './mockData';

// Re-import per test to reset the in-memory store
let api: typeof import('./api');

beforeEach(async () => {
  vi.resetModules();
  api = await import('./api');
});

// Derive stable references from mockData so tests don't break when data changes
const user0 = MOCK_USERS[0]; // liked some posts
const user1 = MOCK_USERS[1]; // no initial likes

// A post that user0 likes initially
const likedPost = INITIAL_POSTS.find((p) =>
  INITIAL_LIKES.some((l) => l.postId === p.postId && l.userId === user0.id),
)!;
// A post that user0 does NOT like initially
const notLikedPost = INITIAL_POSTS.find(
  (p) => !INITIAL_LIKES.some((l) => l.postId === p.postId && l.userId === user0.id),
)!;

describe('getPosts', () => {
  it('returns posts sorted by newest first', async () => {
    const { posts } = await api.getPosts(user0.id);
    expect(posts.length).toBeGreaterThan(0);
    for (let i = 0; i < posts.length - 1; i++) {
      expect(new Date(posts[i].createdAt).getTime()).toBeGreaterThanOrEqual(
        new Date(posts[i + 1].createdAt).getTime(),
      );
    }
  });

  it('reflects liked state for the requesting user', async () => {
    const { posts } = await api.getPosts(user0.id);
    const liked = posts.find((p) => p.postId === likedPost.postId);
    const notLiked = posts.find((p) => p.postId === notLikedPost.postId);
    expect(liked?.liked).toBe(true);
    expect(notLiked?.liked).toBe(false);
  });
});

describe('addLike', () => {
  it('increments likeCount', async () => {
    // user1 has no initial likes on notLikedPost
    const before = await api.getPosts(user1.id);
    const post = before.posts.find((p) => p.postId === notLikedPost.postId)!;
    await api.addLike(notLikedPost.postId, user1.id);
    const after = await api.getPosts(user1.id);
    const updated = after.posts.find((p) => p.postId === notLikedPost.postId)!;
    expect(updated.likeCount).toBe(post.likeCount + 1);
    expect(updated.liked).toBe(true);
  });

  it('is idempotent (no double-like)', async () => {
    const before = await api.getPosts(user1.id);
    const post = before.posts.find((p) => p.postId === notLikedPost.postId)!;
    await api.addLike(notLikedPost.postId, user1.id);
    await api.addLike(notLikedPost.postId, user1.id);
    const after = await api.getPosts(user1.id);
    const updated = after.posts.find((p) => p.postId === notLikedPost.postId)!;
    expect(updated.likeCount).toBe(post.likeCount + 1);
  });
});

describe('deleteLike', () => {
  it('decrements likeCount', async () => {
    // user0 already likes likedPost
    const before = await api.getPosts(user0.id);
    const post = before.posts.find((p) => p.postId === likedPost.postId)!;
    await api.deleteLike(likedPost.postId, user0.id);
    const after = await api.getPosts(user0.id);
    const updated = after.posts.find((p) => p.postId === likedPost.postId)!;
    expect(updated.likeCount).toBe(post.likeCount - 1);
    expect(updated.liked).toBe(false);
  });

  it('is idempotent (no negative count)', async () => {
    const before = await api.getPosts(user0.id);
    const post = before.posts.find((p) => p.postId === likedPost.postId)!;
    await api.deleteLike(likedPost.postId, user0.id);
    await api.deleteLike(likedPost.postId, user0.id);
    const after = await api.getPosts(user0.id);
    const updated = after.posts.find((p) => p.postId === likedPost.postId)!;
    expect(updated.likeCount).toBe(post.likeCount - 1);
  });
});

describe('createPost', () => {
  it('appears at the top of getPosts', async () => {
    const created = await api.createPost('テスト投稿', user0);
    expect(created.content).toBe('テスト投稿');
    expect(created.likeCount).toBe(0);
    expect(created.liked).toBe(false);

    const { posts } = await api.getPosts(user0.id);
    expect(posts[0].postId).toBe(created.postId);
  });
});
