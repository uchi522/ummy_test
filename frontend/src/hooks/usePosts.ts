import { useState, useEffect, useCallback } from 'react';
import { Post, getPosts, createPost, addLike, deleteLike } from '@/lib/api';
import { useMockUser } from '@/contexts/MockUserContext';

export function usePosts() {
  const { currentUser } = useMockUser();
  const [posts, setPosts] = useState<Post[]>([]);
  const [nextToken, setNextToken] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // Reload from page 1 when the active user changes (liked state differs per user)
  const loadInitial = useCallback(async () => {
    setLoading(true);
    const res = await getPosts(currentUser.id);
    setPosts(res.posts);
    setNextToken(res.nextToken ?? undefined);
    setHasMore(res.nextToken !== null);
    setLoading(false);
  }, [currentUser.id]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    setLoading(true);
    const res = await getPosts(currentUser.id, 20, nextToken);
    setPosts((prev) => [...prev, ...res.posts]);
    setNextToken(res.nextToken ?? undefined);
    setHasMore(res.nextToken !== null);
    setLoading(false);
  }, [currentUser.id, hasMore, loading, nextToken]);

  const submitPost = useCallback(
    async (content: string) => {
      const newPost = await createPost(content, currentUser);
      setPosts((prev) => [newPost, ...prev]);
    },
    [currentUser],
  );

  const toggleLike = useCallback(
    async (postId: string, liked: boolean) => {
      // Optimistic update
      setPosts((prev) =>
        prev.map((p) =>
          p.postId === postId
            ? { ...p, liked: !liked, likeCount: liked ? p.likeCount - 1 : p.likeCount + 1 }
            : p,
        ),
      );
      if (liked) {
        await deleteLike(postId, currentUser.id);
      } else {
        await addLike(postId, currentUser.id);
      }
    },
    [currentUser.id],
  );

  return { posts, hasMore, loading, loadMore, submitPost, toggleLike };
}
