// connectionsContext.ts
import { createContext } from 'react';

export interface ConnectionsContextType {
    connections: any[]; // Define the type of connections appropriately
    setConnections: (connections: any[]) => void;
}

const ConnectionsContext = createContext<ConnectionsContextType>({
    connections: [],
    setConnections: () => {},
});

export default ConnectionsContext;