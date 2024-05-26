import { SearchPost, SearchProfile, Feature } from "./types";

export interface ProfileState {
    currentProfile: any | null;
    setCurrentProfile: (profile: any) => void;
}

export interface ConnectionsState {
    connections: any | null;
    setConnections: (connections: any) => void;

}

export interface NotificationsState {
    notifications: { received: any, sent: any };
    setNotifications: (notifications: any) => void;

}


export interface FeatureSectionProps {
    features: Feature[];
}

export interface FeatureCardProps {
    feature: Feature;
}

export interface SearchResult {
    posts: SearchPost[];
    profiles: SearchProfile[];
}


export interface SideBarGraphicsProps {
    setNotificationsOpen: (open: boolean) => void;
    setSearchOpen: (open: boolean) => void;
}


export interface ChatAppProps {
    userId: number | string
    chatroomId: number | string
    username: string
    toggleChatApp: () => void
}

export interface PostProps {
    refetch: () => void;
    post: {
        id: number;
        title: string;
        body: string;
        img: string;
        post_image: string;
        likes_count: number;
        comments_count: number;
        new_likes: { profile_id: number; img: string }[];
        profile_id: number;
        profile_photo: string;
        fullName?: string;
        full_name?: string;
        username: string;
    };
    postBody: string;
    view?: boolean;
    onEdit: (updatedPost: any) => void;
    isSettingsPage?: boolean;
    
}


export interface CreatePostProps {
    refetchPosts: (() => void ) | any;
    initialTitle?: string;
    initialBody?: string;
    initialImage?: string | null;
    postId?: number | null;
    onCancel: () => void;
    onSave: (postData: any) => void;
  
  }