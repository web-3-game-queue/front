import { createBrowserRouter } from 'react-router-dom';
import { IndexComponent } from '../components';
import { DemoComponent } from '../components/demo';
import BasicExample from '../components/test';

export const router = createBrowserRouter([
    {
        path: '/',
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
]);
