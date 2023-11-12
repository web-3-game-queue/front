import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { IndexComponent } from './Index';
import { MapsPageComponent } from '../Maps/MapsPage';
import { MapPageParamIdComponent } from '../Maps/MapPage/MapPageParamId';
import { LoginComponent } from '../Auth/Login';
import { RegisterComponent } from '../Auth/Register';
import { TestComponent } from '../Test';
import { CartComponent } from '../Cart/Cart';
import { MapEditPageParamIdComponent } from '../Maps/MapEdit/MapEditPageParamId';
import { MapAddPageComponent } from '../Maps/MapAdd/MapAddPage';
import { SearchMapsRequestListComponent } from '../SearchMapsRequest/SearchMapsRequestsList';

export const RoutesComponent: FC = () => (
    <Routes>
        <Route path="/" element={<Navigate to="/index" />} />
        <Route path="/index" element={<IndexComponent />} />
        <Route path="/maps" element={<MapsPageComponent />} />
        <Route path="/maps/:id" element={<MapPageParamIdComponent />} />
        <Route path="/login" element={<LoginComponent />} />
        <Route path="/register" element={<RegisterComponent />} />
        <Route path="/cart" element={<CartComponent />} />
        <Route path="/test" element={<TestComponent />} />
        <Route path="/maps/:id/edit" element={<MapEditPageParamIdComponent />} />
        <Route path="/maps/create" element={<MapAddPageComponent />} />
        <Route path="/requests" element={<SearchMapsRequestListComponent />} />
    </Routes>
);
