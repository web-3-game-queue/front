import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/index.esm.js';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './styles/index.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { TOKEN_COOKIE } from './Configuration.ts';

axios.interceptors.request.use((config) => {
    const cookies = new Cookies();
    config.headers.Authorization = cookies.get(TOKEN_COOKIE);
    console.log('Setting axios cookie header');
    return config;
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
