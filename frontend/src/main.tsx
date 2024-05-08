
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App.js';
import UserContextProvider from './contexts/CurrentUserContextProvider.jsx';
import './index.css';
import * as React from "react";

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>,
);
