import { FC } from 'react';
import { Map, MapToString } from '../../../Core/Models/Map';
import { StaticDataAPI } from '../../../Core/APIs/StaticDataAPI';
import { Link } from 'react-router-dom';

export const MapCardComponent: FC<Map> = (map) => {
    const coverImageUrl = StaticDataAPI.FormMapCoverUrl(map);
    return (
        <div className="col mb-3 mb-sm-0 p-0 p-xl-3" key={map.id}>
            <div className="card" style={{ width: 'auto' }}>
                <img className="card-img-top" src={coverImageUrl} alt="Minimap image" />
                <div className="card-body">
                    <h5 className="card-title">{MapToString(map)}</h5>
                    <h6>
                        Стоимость входа: <strong>{map.price}$</strong>
                    </h6>
                    <Link to={`./${map.id}`} className="btn btn-primary">
                        More details
                    </Link>
                </div>
            </div>
        </div>
    );
};
