import { FC, useState, useEffect } from 'react';
import { Map, MapToString } from '../../../Core/Models/Map';
import { MapAPI } from '../../../Core/APIs/MapAPI';
import { LoadingIndicator } from '../../UI/LoadingIndicator';
import { MapStatus } from '../../../Core/Models/MapStatus';
import { StaticDataAPI } from '../../../Core/APIs/StaticDataAPI';

interface MapPageComponentProps {
    id: number;
}

export const MapPageComponent: FC<MapPageComponentProps> = ({ id }: MapPageComponentProps) => {
    const [map, setMap] = useState<Map | null | undefined>(undefined);

    useEffect(() => {
        async function getMap() {
            const gotMap = await MapAPI.GetMap(id);
            setMap(gotMap);
        }
        getMap();
        return () => {};
    }, [id]);

    const onClickDelete = async () => {
        await MapAPI.DeleteMap(id);
    };

    if (map === null) {
        return <h2>Карта с номером #{id} не найдена</h2>;
    } else if (map == undefined) {
        return <LoadingIndicator />;
    }
    const coverImageUrl = StaticDataAPI.FormMapCoverUrl(map);
    const controls =
        map.mapStatus == MapStatus.Deleted ? (
            <h5>Недоступна.</h5>
        ) : (
            <div>
                <button className="btn btn-danger" onClick={onClickDelete}>
                    Удалить
                </button>
            </div>
        );
    return (
        <div className="card" key={map.id}>
            <div className="card-body">
                <img src={coverImageUrl} alt="Minimap image" style={{ width: '40rem', border: '1px solid black' }} />
                <h3 className="card-title">{map.name}</h3>
                {MapToString(map)}
                <br />
                Стоимость входа: <strong>{map.price}$</strong>
                {controls}
            </div>
        </div>
    );
};
