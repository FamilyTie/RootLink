import React, { ReactNode, useState } from 'react';
import ConnectionsContext from './connectionsContext';

interface ConnectionsContextProviderProps {
    children: ReactNode;
}

const ConnectionsContextProvider: React.FC<ConnectionsContextProviderProps> = ({ children }) => {
    const [connections, setConnections] = useState<any[]>([]); // Use the appropriate type for connections

    const contextValue = {
        connections,
        setConnections,
    };

    return (
        <ConnectionsContext.Provider value={contextValue}>
            {children}
        </ConnectionsContext.Provider>
    );
};

export default ConnectionsContextProvider;