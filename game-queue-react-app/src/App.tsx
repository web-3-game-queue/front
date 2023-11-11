/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter } from 'react-router-dom';
import './styles/App.css';
import { FC } from 'react';
import { HeaderComponent } from './Components/Basic/Header';
import { FooterComponent } from './Components/Basic/Footer';
import { ErrorBoundary } from 'react-error-boundary';
import { TestComponent } from './Components/Test';
import { Provider } from 'react-redux';
import { store, persistor } from './Core/Storage/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { LoadingIndicator } from './Components/UI/LoadingIndicator';
import { RoutesComponent } from './Components/Basic/Routes';

const App: FC = () => (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <Provider store={store}>
            <PersistGate loading={<LoadingIndicator />} persistor={persistor}>
                <BrowserRouter basename="/front">
                    <HeaderComponent />

                    <div className="container">
                        <main role="main" className="pb-3">
                            <RoutesComponent />
                        </main>
                    </div>
                    <TestComponent />

                    <FooterComponent />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </ErrorBoundary>
);

export default App;
