import { FC } from 'react';
import { StaticDataAPI } from '../../../Core/APIs/StaticDataAPI';
import { Link } from 'react-router-dom';
import { Map, MapStatus, MapToString } from '../../../Autogenerated/Backend';
import { SearchMapsRequestAPI } from '../../../Core/APIs/SearchMapsRequestAPI';
import { addMapId, removeMapId, setCurrentRequestId, useAuth } from '../../../Core/Storage/DataSlice';
import { useDispatch } from 'react-redux';

interface MapCardComponentProps {
    map: Map;
    added: boolean;
    showButtons: boolean;
}

export const MapCardComponent: FC<MapCardComponentProps> = ({ map, added, showButtons }) => {
    const coverImageUrl = StaticDataAPI.FormMapCoverUrl(map);
    const auth = useAuth();
    const dispatch = useDispatch();

    async function onAddMap() {
        const searchMapsRequestId = await SearchMapsRequestAPI.AddMapToRequest(map.id!);
        dispatch(addMapId(map.id!));
        dispatch(setCurrentRequestId(searchMapsRequestId));
    }

    async function onRemoveAdd() {
        await SearchMapsRequestAPI.RemoveMapFromRequest(map.id!);
        dispatch(removeMapId(map.id!));
    }

    const addButton =
        !showButtons || auth === null || map.mapStatus !== MapStatus.Available ? (
            <></>
        ) : added ? (
            <button className="btn btn-warning m-1" onClick={onRemoveAdd}>
                Снять выбор
            </button>
        ) : (
            <button className="btn btn-info m-1" onClick={onAddMap}>
                Выбрать карту
            </button>
        );

    const bgColor = map.mapStatus === MapStatus.Available ? '' : 'bg-danger-subtle';

    return (
        <div className="col mb mb-sm-0 p-0 p-xl-3" key={map.id}>
            <div className={`card ${bgColor}`} style={{ width: 'auto', height: 'auto' }}>
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
                    <Link to={`/maps/${map.id}`} className="btn btn-primary">
                        Подробнее
                    </Link>
                    {addButton}
                </div>
            </div>
        </div>
    );
};
