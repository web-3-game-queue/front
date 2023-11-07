import { FC, useEffect, useState } from 'react';
import { MapAPI } from '../../Core/APIs/MapAPI';
import { MapListComponent } from './MapList/MapList';
import { Map } from '../../Core/Models/Map';
import { LoadingIndicator } from '../UI/LoadingIndicator';

export const MapsPageComponent: FC = () => {
    const [maps, setMaps] = useState<Map[] | undefined>(undefined);
    useEffect(() => {
        async function getMaps() {
            const maps = await MapAPI.GetMaps();
            setMaps(maps);
        }
        getMaps();
    });
    if (!maps) {
        return <LoadingIndicator />;
    }
    return <MapListComponent maps={maps} />;
};
