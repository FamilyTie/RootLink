import create from 'zustand';
import { ProfileState, ConnectionsState, NotificationsState } from '../../interfaces';



export const useProfile = create<ProfileState>(set => ({
    currentProfile: null,
    setCurrentProfile: (profile : any) => set({ currentProfile: profile }),
}));

export const useConnections = create<ConnectionsState>(set => ({
    connections: null,
    setConnections: (connections: any) => set({ connections: connections }),
}));


export const useNotifications = create<NotificationsState>(set => ({
    notifications: { received: [], sent: [] },
    setNotifications: (notifications: any) => set({ notifications: notifications }),
}));
