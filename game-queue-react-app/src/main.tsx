import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/index.esm.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import axios from 'axios';
import { TOKEN_COOKIE } from './Configuration.ts';
import { COOKIES } from './Core/Cookies.ts';

axios.interceptors.request.use((config) => {
    const authCookie = COOKIES.get(TOKEN_COOKIE);
    if (authCookie) {
        config.headers.Authorization = authCookie;
    }
    return config;
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
