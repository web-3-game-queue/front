import { FC, useState, useEffect } from 'react';
import { Map, MapToString } from '../../../Core/Models/Map';
import { MapAPI } from '../../../Core/APIs/MapAPI';
import { LoadingIndicator } from '../../UI/LoadingIndicator';
import { MapStatus } from '../../../Core/Models/MapStatus';
import { StaticDataAPI } from '../../../Core/APIs/StaticDataAPI';
import { useParams } from 'react-router-dom';

export const MapPageComponent: FC = () => {
    const params = useParams();
    console.log('params :>> ', params);
    const { id: idStr } = useParams();
    const [map, setMap] = useState<Map | null | undefined>(undefined);
    useEffect(() => {
        async function getMap() {
            const map = await MapAPI.GetMap(id);
            setMap(map);
        }
        getMap();
    });
    if (!idStr) {
        return <h2>Не указан id карты</h2>;
    }
    const id = parseInt(idStr);
    if (map == undefined) {
        return <LoadingIndicator />;
    } else if (map == null) {
        return <h2>Карта с номером #{id} не найдена</h2>;
    }
    const coverImageUrl = StaticDataAPI.FormMapCoverUrl(map);
    const controls =
        map.mapStatus == MapStatus.Deleted ? (
            <h5>Недоступна.</h5>
        ) : (
            <form method="post">
                <button className="btn btn-danger">Удалить</button>
            </form>
        );
    return (
        <div className="card" key={map.id}>
            <div className="card-body">
                <img className="card-img-top p-3" src={coverImageUrl} alt="Minimap image" style={{ width: '40rem' }} />
                <h3 className="card-title">{map.name}</h3>
                {MapToString(map)}
                <br />
                Стоимость входа: <strong>{map.price}$</strong>
                {controls}
            </div>
        </div>
    );
};
