import { FC } from 'react';
import { Map, MapToString } from '../../../Core/Models/Map';
import { StaticDataAPI } from '../../../Core/APIs/StaticDataAPI';
import { Link } from 'react-router-dom';

export const MapCardComponent: FC<Map> = (map) => {
    const coverImageUrl = StaticDataAPI.FormMapCoverUrl(map);
    return (
        <div className="col mb-3 mb-sm-0 p-0 p-xl-3" key={map.id}>
            <div className="card" style={{ width: 'auto', height: 'auto' }}>
                <div
                    className="card-img-top"
                    style={{
                        height: '15rem',
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