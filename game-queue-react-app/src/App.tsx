import { RouterProvider } from 'react-router-dom';
import './styles/App.css';
import { FC } from 'react';
import { router } from './router/router';

const App: FC = () => <RouterProvider router={router} />;

export default App;
