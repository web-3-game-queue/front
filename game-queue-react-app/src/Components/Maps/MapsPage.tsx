import { FC, useEffect, useState, useRef } from 'react';
import { MapAPI } from '../../Core/APIs/MapAPI';
import { MapListComponent } from './MapList/MapList';
import { Map } from '../../Core/Models/Map';
import { LoadingIndicator } from '../UI/LoadingIndicator';

export const MapsPageComponent: FC = () => {
    const [maps, setMaps] = useState<Map[] | undefined>(undefined);
    const [filterName, setFilterName] = useState<string | undefined>(undefined);
    const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
    useEffect(() => {
        async function getMaps() {
            const maps = await MapAPI.GetMaps(filterName, maxPrice);
            setMaps(maps);
        }
        getMaps();
    }, [filterName, maxPrice]);

    const filterNameInput = useRef<HTMLInputElement>(null);
    const maxPriceInput = useRef<HTMLInputElement>(null);

    function handleSubmit(event: React.FormEvent) {
        setFilterName(filterNameInput.current?.value);
        if (maxPriceInput.current) {
            setMaxPrice(parseInt(maxPriceInput.current.value));
        }
        event.preventDefault()
    }

    if (!maps) {
        return <LoadingIndicator />;
    }
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
                        <label htmlFor="FilterMapPrice" className="form-label">
                            Стоимость входа
                        </label>
                        <input type="number" className="form-control" id="FilterMapPrice" name="FilterMapPrice" min="0" ref={maxPriceInput} />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Применить
                    </button>
                </form>
            </div>
            <MapListComponent maps={maps} />
        </div>
    );
};
