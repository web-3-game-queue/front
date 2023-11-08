import { FC, useEffect, useState, useRef } from 'react';
import { MapAPI } from '../../Core/APIs/MapAPI';
import { MapListComponent } from './MapList/MapList';
import { Map } from '../../Core/Models/Map';
import { LoadingIndicator } from '../UI/LoadingIndicator';

export const MapsPageComponent: FC = () => {
    const [maps, setMaps] = useState<Map[] | undefined>(undefined);
    const [filterName, setFilterName] = useState<string | undefined>(undefined);
    const [maxPlayersCount, setMaxPlayersCount] = useState<number | undefined>(undefined);
    useEffect(() => {
        async function getMaps() {
            const maps = await MapAPI.GetMaps(filterName, maxPlayersCount);
            setMaps(maps);
        }
        getMaps();
    }, [filterName, maxPlayersCount]);

    const filterNameInput = useRef<HTMLInputElement>(null);
    const maxPlayersCountInput = useRef<HTMLInputElement>(null);

    function handleSubmit(event: React.FormEvent) {
        setFilterName(filterNameInput.current?.value);
        if (maxPlayersCountInput.current) {
            setMaxPlayersCount(parseInt(maxPlayersCountInput.current.value));
        }
        event.preventDefault();
    }

    if (!maps) {
        return <LoadingIndicator />;
    }
    const mapsDisplay =
        maps.length == 0 ? (
            <div
                className="container"
                style={{
                    display: 'table',
                    textAlign: 'center'
                }}
            >
                <span
                    style={{
                        display: 'table-cell',
                        verticalAlign: 'middle'
                    }}
                >
                    <h3>Не найдено</h3>
                </span>
            </div>
        ) : (
            <MapListComponent maps={maps} />
        );
    return (
        <div className="container" style={{ display: 'flex' }}>
            <div>
                <form method="get" className="card p-2 m-3" style={{ width: '250px' }} onSubmit={(e) => handleSubmit(e)}>
                    <div style={{ display: 'flex' }}>
                        <h5>Фильтры</h5>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="FilterMapName" className="form-label">
                            Название карты
                        </label>
                        <input type="text" className="form-control" id="FilterMapName" name="FilterMapName" ref={filterNameInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="FilterMapMaxPlayersCount" className="form-label">
                            Максимальное количество игроков
                        </label>
                        <input type="number" className="form-control" id="FilterMapMaxPlayersCount" name="FilterMapMaxPlayersCount" min="0" ref={maxPlayersCountInput} />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Применить
                    </button>
                </form>
            </div>
            {mapsDisplay}
        </div>
    );
};
