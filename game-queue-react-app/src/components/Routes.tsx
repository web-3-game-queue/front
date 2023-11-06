import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { DemoComponent } from './demo';
import BasicExample from './test';
import { IndexComponent } from '.';

export const RoutesComponent: FC = () => (
    <Routes>
        <Route path="/" element={<Navigate to="/index" />} />
        <Route path="/index" element={<IndexComponent />} />
        <Route path="/demo" element={<DemoComponent />} />
        <Route path="/test" element={<BasicExample />} />
    </Routes>
);
