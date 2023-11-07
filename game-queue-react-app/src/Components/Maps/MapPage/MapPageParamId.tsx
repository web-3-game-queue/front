import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { MapPageComponent } from './MapPage';

export const MapPageParamIdComponent: FC = () => {
    const { id: idStr } = useParams();
    if (!idStr) {
        return <h2>Не указан id карты</h2>;
    }
    const id = parseInt(idStr);
    if (Number.isNaN(id)) {
        return <h2>Неверно указан id карты</h2>;
    }
    return <MapPageComponent id={id} />;
};
