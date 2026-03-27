import { usePosts } from '@/hooks/usePosts';
import { PostCreationBox } from './PostCreationBox';
import { PostCard } from './PostCard';

export function CentralFeed() {
  const { posts, hasMore, loading, loadMore, submitPost, toggleLike } = usePosts();

  return (
    <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
      <div className="max-w-2xl mx-auto">
        <PostCreationBox onSubmit={submitPost} />

        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.postId} {...post} onToggleLike={toggleLike} />
          ))}
        </div>

        {loading && posts.length === 0 && (
          <div className="text-center text-gray-400 py-12">読み込み中…</div>
        )}

        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              disabled={loading}
              className="px-6 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {loading ? '読み込み中…' : 'もっと見る'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
