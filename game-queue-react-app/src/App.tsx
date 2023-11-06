import { BrowserRouter } from 'react-router-dom';
import './styles/App.css';
import { FC } from 'react';
import { HeaderComponent } from './Components/header';
import { FooterComponent } from './Components/footer';
import { RoutesComponent } from './Components/Routes';

const App: FC = () => (
    <BrowserRouter basename="/front">
        <HeaderComponent />

        <div className="container">
            <main role="main" className="pb-3">
                <RoutesComponent />
            </main>
        </div>

        <FooterComponent />
    </BrowserRouter>
);

export default App;
