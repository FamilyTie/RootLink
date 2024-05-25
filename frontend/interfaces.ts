import { SearchPost , SearchProfile, Feature } from "./types";

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

export interface FeatureCardProps  {
    feature: Feature;
  }

export interface SearchResult {
    posts: SearchPost[];
    profiles: SearchProfile[];
}

