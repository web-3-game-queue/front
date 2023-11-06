import { createBrowserRouter } from 'react-router-dom';
import { IndexComponent } from '../components';
import { DemoComponent } from '../components/demo';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <IndexComponent />
    },
    {
        path: '/demo',
        element: <DemoComponent />
    }
]);
