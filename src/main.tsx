import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;

// Check if prerendered content exists
const hasPrerenderedContent = container.innerHTML.trim() !== '' &&
                               container.innerHTML.trim() !== '<!--app-html-->';

if (hasPrerenderedContent) {
  // Hydrate prerendered HTML
  hydrateRoot(container,
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
} else {
  // Client-side render fallback
  createRoot(container).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}
