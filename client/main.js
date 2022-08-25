import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './pages/App';
import './styles/style.css';

function component() {
    const element = document.createElement('div');

    element.id = 'root';

    return element;
}

document.body.appendChild(component());

const root = createRoot(document.getElementById('root'));
root.render(<App />);