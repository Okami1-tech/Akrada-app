export type UserRole = 'user' | 'admin' | 'founder' | 'system';

export type RelationshipStatus =
  | 'single'
  | 'in_a_relationship'
  | 'engaged'
  | 'married'
  | 'prefer_not_to_say'
  | null;

export interface University {
  id: string;
  name: string;
  abbreviation: string;
  state: string;
}

export interface Profile {
  id: string;
  username: string;
  display_name: string;
  avatar_url: string | null;
  bio: string | null;
  hobbies: string[];
  relationship_status: RelationshipStatus;
  external_links: { label: string; url: string }[];
  university_id: string;
  university?: University;
  role: UserRole;
  is_verified: boolean;
  is_banned: boolean;
  is_suspended: boolean;
  followers_count: number;
  following_count: number;
  posts_count: number;
  created_at: string;
}

export interface Post {
  id: string;
  author_id: string;
  author?: Profile;
  content: string;
  media_urls: string[];
  media_type: 'image' | 'video' | null;
  likes_count: number;
  comments_count: number;
  is_pinned: boolean;
  university_id: string | null;
  club_id: string | null;
  created_at: string;
  updated_at: string;
  is_liked?: boolean;
}

export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  author?: Profile;
  content: string;
  likes_count: number;
  created_at: string;
  is_liked?: boolean;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  avatar_url: string | null;
  banner_url: string | null;
  university_id: string | null;
  university?: University;
  is_university_wide: boolean;
  rules: string[];
  members_count: number;
  created_by: string;
  creator?: Profile;
  created_at: string;
  is_member?: boolean;
  member_role?: 'member' | 'admin' | 'owner';
}

export interface ClubMember {
  club_id: string;
  user_id: string;
  profile?: Profile;
  role: 'member' | 'admin' | 'owner';
  joined_at: string;
}

export interface Follow {
  follower_id: string;
  following_id: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  actor_id: string;
  actor?: Profile;
  type: 'like' | 'comment' | 'follow' | 'mention' | 'club_invite' | 'verification_approved';
  post_id?: string;
  club_id?: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  reporter?: Profile;
  reported_post_id?: string;
  reported_user_id?: string;
  reported_club_id?: string;
  reason: string;
  status: 'pending' | 'resolved' | 'dismissed';
  created_at: string;
}

export interface VerificationRequest {
  id: string;
  user_id: string;
  profile?: Profile;
  proof_url: string;
  status: 'pending' | 'approved' | 'rejected';
  notes: string | null;
  reviewed_by: string | null;
  created_at: string;
}

export interface SearchResult {
  users: Profile[];
  posts: Post[];
  clubs: Club[];
  universities: University[];
}

export interface FeedType {
  type: 'global' | 'university' | 'club' | 'profile' | 'following';
  id?: string;
}
