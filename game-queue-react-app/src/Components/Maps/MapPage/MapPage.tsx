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
    const [needsUpdate, setNeedsUpdate] = useState(true);

    useEffect(() => {
        async function getMap() {
            const gotMap = await MapAPI.GetMap(id);
            setMap(gotMap);
        }
        if (needsUpdate) {
            getMap();
            setNeedsUpdate(false);
        }
        return () => {};
    }, [id, needsUpdate]);

    const onClickDelete = async () => {
        await MapAPI.DeleteMap(id);
        setNeedsUpdate(true);
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
    const description = map.description ? <span>{map.description}</span> : <span className="text-body-secondary">Описание отсутствует</span>;
    return (
        <div className="card" key={map.id}>
            <div className="card-body">
                <div
                    style={{
                        height: '30rem',
                        position: 'relative'
                    }}
                >
                    <img
                        src={coverImageUrl}
                        alt="Minimap image"
                        style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            resize: 'both',
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            margin: 'auto',
                            width: 'auto',
                            height: 'auto',
                            border: '1px solid black'
                        }}
                    />
                </div>
                <h3 className="card-title">{map.name}</h3>
                {MapToString(map)}
                <br />
                {description}
                {controls}
            </div>
        </div>
    );
};
