import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;

// Check if the container has prerendered content
const hasPrerenderedContent = container.innerHTML.trim() !== '<!--app-html-->' && container.innerHTML.trim() !== '';

if (hasPrerenderedContent) {
  // Hydrate the prerendered content
  hydrateRoot(container, 
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
} else {
  // Fallback to client-side rendering if no prerendered content
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}