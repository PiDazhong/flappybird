import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Game from 'pages/index.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Game />
  </StrictMode>,
);
