import { FC, useEffect, useState } from 'react';
import { useAuth } from '../../../Core/Storage/DataSlice';
import { useNavigate } from 'react-router-dom';
import { Map } from '../../../Autogenerated/Backend';
import { LoadingIndicator } from '../../UI/LoadingIndicator';
import { MapTableRowComponent } from './MapTableRow';
import { MapAPI } from '../../../Core/APIs/MapAPI';
import { Link } from 'react-router-dom';

export const MapsTableComponent: FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [maps, setMaps] = useState<Map[] | null>(null);

    useEffect(() => {
        async function loadData() {
            const maps = await MapAPI.GetMaps();
            setMaps(maps);
        }

        if (auth == null) {
            navigate('/');
        }
        loadData();
    }, [auth, navigate]);

    return (
        <div>
            <h3>Список карт</h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Изображение</th>
                        <th scope="col">Название</th>
                        <th scope="col">Ширина</th>
                        <th scope="col">Высота</th>
                        <th scope="col">Максимальное кол-во игроков</th>
                        <th scope="col">Описание</th>
                        <th scope="col">Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {maps == null ? <LoadingIndicator /> : maps.map((m) => <MapTableRowComponent map={m} />)}
                    <td colSpan={9}>
                        <Link to="/maps/create" className="btn btn-primary" style={{ width: '100%' }}>
                            Добавить
                        </Link>
                    </td>
                </tbody>
            </table>
        </div>
    );
};