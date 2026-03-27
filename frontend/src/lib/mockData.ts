export interface MockUser {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface PostItem {
  postId: string;
  content: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  createdAt: string;
  likeCount: number;
}

export interface LikeItem {
  postId: string;
  userId: string;
}

export const MOCK_USERS: MockUser[] = [
  {
    id: 'user-001',
    name: '田中 さくら',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80',
  },
  {
    id: 'user-002',
    name: '鈴木 拓海',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
  },
  {
    id: 'user-003',
    name: '佐藤 美咲',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
  },
];

export const INITIAL_POSTS: PostItem[] = [
  {
    postId: 'post-001',
    content:
      'Q1の目標を無事達成できました！チームの皆さんのおかげです。来期もよろしくお願いします。',
    ownerId: 'user-001',
    ownerName: '田中 さくら',
    ownerAvatar: MOCK_USERS[0].avatarUrl,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likeCount: 124,
  },
  {
    postId: 'post-002',
    content:
      'プラットフォームのパフォーマンス改善をリリースしました。ページ読み込みが約40%高速化しています。エンジニアチームの頑張りに感謝！',
    ownerId: 'user-002',
    ownerName: '鈴木 拓海',
    ownerAvatar: MOCK_USERS[1].avatarUrl,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    likeCount: 89,
  },
  {
    postId: 'post-003',
    content:
      '来週月曜から社内ウェルネスプログラムが始まります。ヨガやメンタルヘルスワークショップなど、ぜひ参加してみてください！',
    ownerId: 'user-003',
    ownerName: '佐藤 美咲',
    ownerAvatar: MOCK_USERS[2].avatarUrl,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    likeCount: 156,
  },
];

export const INITIAL_LIKES: LikeItem[] = [
  { postId: 'post-001', userId: 'user-001' },
  { postId: 'post-003', userId: 'user-001' },
];
