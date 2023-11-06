import { Navigate, createBrowserRouter } from 'react-router-dom';
import { IndexComponent } from '../components';
import { DemoComponent } from '../components/demo';
import BasicExample from '../components/test';

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Navigate to="/index" replace/>
        },
        {
            path: '/index',
            element: <IndexComponent />
        },
        {
            path: '/demo',
            element: <DemoComponent />
        },
        {
            path: '/test',
            element: <BasicExample />
        }
    ],
    { basename: '/front' }
);
