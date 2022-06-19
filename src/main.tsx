import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { far, faMessage } from '@fortawesome/free-regular-svg-icons';

library.add(far, faMessage);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <DndProvider backend={HTML5Backend}>
    <App />
  </DndProvider>,
);
