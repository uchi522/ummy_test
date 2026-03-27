import { Heart } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  postId: string;
  ownerName: string;
  ownerAvatar: string;
  createdAt: string;
  content: string;
  likeCount: number;
  liked: boolean;
  onToggleLike: (postId: string, liked: boolean) => void;
}

export function PostCard({
  postId,
  ownerName,
  ownerAvatar,
  createdAt,
  content,
  likeCount,
  liked,
  onToggleLike,
}: PostCardProps) {
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-4 hover:shadow-md transition-shadow">
      <div className="p-5 pb-3 flex items-center gap-3">
        <img
          src={ownerAvatar}
          alt={ownerName}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        <div>
          <h3 className="font-semibold text-gray-900">{ownerName}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{timeAgo}</p>
        </div>
      </div>

      <div className="px-5 pb-3">
        <p className="text-gray-800 leading-relaxed">{content}</p>
      </div>

      <div className="px-5 py-3 border-t border-gray-100">
        <button
          onClick={() => onToggleLike(postId, liked)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            liked ? 'text-[#FF6347] bg-red-50' : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-[#FF6347]' : ''}`} />
          <span className="font-medium">{likeCount}</span>
        </button>
      </div>
    </div>
  );
}
