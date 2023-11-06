import { RouterProvider } from 'react-router-dom';
import './styles/App.css';
import { FC } from 'react';
import { router } from './router/router';
import { HeaderComponent } from './components/header';
import { FooterComponent } from './components/footer';

const App: FC = () => (
    <>
        <HeaderComponent />

        <div className="container">
            <main role="main" className="pb-3">
                <RouterProvider router={router} />
            </main>
        </div>

        <FooterComponent />
    </>
);

export default App;
