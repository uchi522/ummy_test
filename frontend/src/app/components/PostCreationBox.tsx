import { useState } from 'react';
import { useMockUser } from '@/contexts/MockUserContext';

interface Props {
  onSubmit: (content: string) => Promise<void>;
}

export function PostCreationBox({ onSubmit }: Props) {
  const { currentUser } = useMockUser();
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const trimmed = content.trim();
    if (!trimmed || submitting) return;
    setSubmitting(true);
    await onSubmit(trimmed);
    setContent('');
    setSubmitting(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-4">
      <div className="flex gap-3">
        <img
          src={currentUser.avatarUrl}
          alt={currentUser.name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            rows={3}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F08020] focus:border-transparent resize-none"
          />
          <div className="flex justify-end mt-3">
            <button
              onClick={handleSubmit}
              disabled={!content.trim() || submitting}
              className="px-6 py-2 bg-[#F08020] text-white rounded-lg hover:bg-[#e07419] transition-all shadow-md hover:shadow-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
