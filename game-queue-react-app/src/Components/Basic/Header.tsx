import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { reset, setCurrentRequestId, setMapIds, useAuth } from '../../Core/Storage/DataSlice';
import { useDispatch } from 'react-redux';
import { COOKIES } from '../../Core/Cookies';
import { TOKEN_COOKIE } from '../../Configuration';
import { ShopcartComponent } from '../Shopcart';
import { AuthenticationAPI } from '../../Core/APIs/AuthenticationAPI';
import { SearchMapsRequestAPI } from '../../Core/APIs/SearchMapsRequestAPI';
import { BreadcrumbsComponent } from './Breadcrumbs/Breadcrumbs';

export const HeaderComponent: FC = () => {
    const auth = useAuth();

    const [isAdm, setIsAdm] = useState(false);

    const dispatch = useDispatch();

    function logOut() {
        COOKIES.remove(TOKEN_COOKIE, { sameSite: true, secure: true });
        dispatch(reset());
    }

    useEffect(() => {
        async function checkIfLogged() {
            try {
                await AuthenticationAPI.GetMe();
            } catch (error) {
                console.error('Error logging');
                logOut();
            }
            const isAdm = await AuthenticationAPI.IsAdmin();
            setIsAdm(isAdm);
            const currentRequest = await SearchMapsRequestAPI.GetCurrent();
            const currentRequestId = currentRequest?.id ?? null;
            dispatch(setCurrentRequestId(currentRequestId));
            const mapIds = currentRequest?.maps?.map((x) => x.id!) ?? [];
            dispatch(setMapIds(mapIds));
        }
        checkIfLogged();
    });

    const loginDisplay =
        auth === null ? (
            <div>
                <Link className="btn btn-primary" to="/login">
                    Войти
                </Link>{' '}
                <Link className="btn btn-primary" to="/register">
                    Зарегистрироваться
                </Link>
            </div>
        ) : (
            <div>
                Login: <div className="btn btn-primary disabled">{auth.login}</div>
                <button className="btn btn-info ms-1" style={{ position: 'absolute' }} onClick={logOut}>
                    Logout
                </button>
            </div>
        );

    const cartLink =
        auth != null ? (
            <li className="nav-item">
                <Link className="nav-link text-dark" to="./cart">
                    Выбранные карты
                </Link>
            </li>
        ) : (
            <></>
        );

    const requestsLink =
        auth != null ? (
            <li className="nav-item">
                <Link className="nav-link text-dark" to="/requests">
                    Список заявок
                </Link>
            </li>
        ) : (
            <></>
        );

    const addMapLink = isAdm ? (
        <li className="nav-item">
            <Link className="nav-link text-dark" to="/maps/create">
                Создать карту
            </Link>
        </li>
    ) : null;

    const mapTableLink = isAdm ? (
        <li className="nav-item">
            <Link className="nav-link text-dark" to="/maps/table">
                Таблица карт
            </Link>
        </li>
    ) : null;

    return (
        <header>
            <nav className="navbar container" aria-label="breadcrumb">
                <BreadcrumbsComponent />
                <div>
                    {loginDisplay}
                    <ShopcartComponent />
                </div>
            </nav>

            <nav className="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
                <div className="container">
                    <Link className="navbar-brand" to="./">
                        Game queue
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target=".navbar-collapse" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                        <ul className="navbar-nav flex-grow-1">
                            <li className="nav-item">
                                <Link className="nav-link text-dark" to="./maps">
                                    Карты
                                </Link>
                            </li>
                            {cartLink}
                            {requestsLink}
                            {addMapLink}
                            {mapTableLink}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};
