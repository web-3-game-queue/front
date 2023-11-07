import { FC } from 'react';
import { Map } from '../../../Core/Models/Map';
import { MapCardComponent } from '../MapCard/MapCard';

interface MapListProps {
    maps: Map[];
}

export const MapListComponent: FC<MapListProps> = ({ maps }: MapListProps) => {
    return (
        <div className="container" style={{ display: 'flex' }}>
            <div className="row text-center" style={{ width: '100%' }}>
                <h5 className="p-0">Карты:</h5>
                <div className="row row-cols-3">{maps.map(MapCardComponent)}</div>
            </div>
        </div>
    );
};
