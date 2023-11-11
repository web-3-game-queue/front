import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { IndexComponent } from './Index';
import { MapsPageComponent } from '../Maps/MapsPage';
import { MapPageParamIdComponent } from '../Maps/MapPage/MapPageParamId';
import { LoginComponent } from '../Auth/Login';

export const RoutesComponent: FC = () => (
    <Routes>
        <Route path="/" element={<Navigate to="/index" />} />
        <Route path="/index" element={<IndexComponent />} />
        <Route path="/maps" element={<MapsPageComponent />} />
        <Route path="/maps/:id" element={<MapPageParamIdComponent />} />
        <Route path="/login" element={<LoginComponent />} />
    </Routes>
);
