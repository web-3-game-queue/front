import { FC, useEffect, useState } from 'react';
import { LoadingIndicator } from '../UI/LoadingIndicator';
import { SearchMapsRequestVerbose } from '../../Autogenerated/Backend';
import { MapListComponent } from '../Maps/MapList/MapList';
import { SearchMapsRequestAPI } from '../../Core/APIs/SearchMapsRequestAPI';
import { setCurrentRequestId, useAuth, useCurrentRequestId } from '../../Core/Storage/DataSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export const CartComponent: FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [currentRequest, setCurrentRequest] = useState<SearchMapsRequestVerbose | null>(null);
    const currentRequestId = useCurrentRequestId();
    const dispatch = useDispatch();

    useEffect(() => {
        if (auth === null) {
            navigate('../');
        }
        async function getMaps() {
            const request = await SearchMapsRequestAPI.GetCurrent();
            setCurrentRequest(request);
        }
        getMaps();
    }, [auth, navigate, currentRequestId]);

    if (auth === null) {
        return;
    }

    async function onCompose() {
        if (currentRequest !== null) {
            await SearchMapsRequestAPI.ComposeRequest(currentRequest.id!);
            setCurrentRequest(null);
            dispatch(setCurrentRequestId(null));
        }
    }

    async function onDelete() {
        if (currentRequest !== null) {
            await SearchMapsRequestAPI.DeleteRequest(currentRequest.id!);
            setCurrentRequest(null);
            dispatch(setCurrentRequestId(null));
        }
    }

    if (currentRequest === null) {
        return <LoadingIndicator />;
    }
    const mapsDisplay =
        currentRequest.maps!.length == 0 ? (
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
                    <h3 className="text-body-secondary">
                        Пусто. <Link to="/maps">Выбрать карты.</Link>
                    </h3>
                </span>
            </div>
        ) : (
            <>
                <div className="card p-2 m-3" style={{ width: '250px', height: 'fit-content' }}>
                    <div className="mb-1 mt-1">
                        <h4>Заявка #{currentRequest.id!}</h4>
                    </div>
                    <button type="submit" className="btn btn-success" onClick={onCompose}>
                        Сохранить заявку
                    </button>
                    <button type="submit" className="btn btn-danger m-2 mb-0" onClick={onDelete}>
                        Удалить заявку
                    </button>
                </div>
                <MapListComponent maps={currentRequest.maps!} />
            </>
        );
    return (
        <div className="container" style={{ display: 'flex' }}>
            {mapsDisplay}
        </div>
    );
};
