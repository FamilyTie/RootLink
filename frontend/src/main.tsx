import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import UserContextProvider from './contexts/CurrentUserContextProvider';
import ConnectionsContextProvider from "./contexts/ConnectionContextProvider";
import './index.css';


const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <UserContextProvider>
      <ConnectionsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ConnectionsContextProvider>
    </UserContextProvider>
  );
}
