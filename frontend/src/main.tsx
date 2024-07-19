import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';
// if (typeof global === 'undefined') {
//   var global = window
// }

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
  );
}
