import { BrowserRouter } from 'react-router-dom';
import './styles/App.css';
import { FC } from 'react';
import { HeaderComponent } from './Components/Basic/Header';
import { FooterComponent } from './Components/Basic/Footer';
import { RoutesComponent } from './Components/Basic/Routes';
import { ErrorBoundary } from 'react-error-boundary';

const App: FC = () => (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <BrowserRouter basename="/front">
            <HeaderComponent />

            <div className="container">
                <main role="main" className="pb-3">
                    <RoutesComponent />
                </main>
            </div>

            <FooterComponent />
        </BrowserRouter>
    </ErrorBoundary>
);

export default App;
