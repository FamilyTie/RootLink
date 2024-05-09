import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import UserContextProvider from './contexts/CurrentUserContextProvider';
import './index.css';


const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  );
}
