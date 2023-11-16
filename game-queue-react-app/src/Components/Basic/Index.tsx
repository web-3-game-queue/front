import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Core/Storage/DataSlice';
import { AuthenticationAPI } from '../../Core/APIs/AuthenticationAPI';

export const IndexComponent: FC = () => {
    const auth = useAuth();

    const [isAdm, setIsAdm] = useState(false);

    useEffect(() => {
        async function checkIfLogged() {
            const isAdm = await AuthenticationAPI.IsAdmin();
            setIsAdm(isAdm);
        }
        checkIfLogged();
    });

    let menuList = (
        <>
            <li className="list-group-item">
                <h2><Link to="/login">Войти</Link></h2>
            </li>
            <li className="list-group-item">
                <h2><Link to="/login">Зарегистрироваться</Link></h2>
            </li>
        </>
    );

    if (auth !== null) {
        const maps = (
            <li className="list-group-item">
                <Link to="/maps">К картам</Link>
            </li>
        );
        const selectedMaps = (
            <li className="list-group-item">
                <Link to="/cart">Выбранные карты</Link>
            </li>
        );
        const requestsList = (
            <li className="list-group-item">
                <Link to="/requests">Список заявок</Link>
            </li>
        );
        const addMap = isAdm ? (
            <li className="list-group-item">
                <Link to="/maps/create">Создать карту</Link>
            </li>
        ) : null;
        const mapsTable = isAdm ? (
            <li className="list-group-item">
                <Link to="/maps/table">Таблица карт</Link>
            </li>
        ) : null;
        menuList = (
            <>
                {maps}
                {selectedMaps}
                {requestsList}
                {addMap}
                {mapsTable}
            </>
        );
    }

    return (
        <div style={{ textAlign: '-moz-center' }}>
            <ul className="list-group" style={{ width: 'fit-content' }}>
                <li className="list-group-item list-group-item-primary" aria-current="true">
                    Меню
                </li>
                {menuList}
            </ul>
        </div>
    );
};
