import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { setLogin, useLogin } from '../../Core/Storage/DataSlice';
import { useDispatch } from 'react-redux';
import { COOKIES } from '../../Core/Cookies';
import { TOKEN_COOKIE } from '../../Configuration';

export const HeaderComponent: FC = () => {
    const login = useLogin();
    const location = useLocation();
    const paths = location.pathname.split('/').filter((x) => x !== '');
    const lastPath = paths.splice(paths.length - 1);

    const dispatch = useDispatch();

    function logOut() {
        COOKIES.remove(TOKEN_COOKIE);
        dispatch(setLogin(null));
    }

    const loginDisplay =
        login === null ? (
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
                Login: <div className="btn btn-primary disabled">{login}</div>
                <button className="btn btn-info ms-1" style={{ position: 'absolute' }} onClick={logOut}>
                    Logout
                </button>
            </div>
        );

    return (
        <header>
            <nav className="navbar container" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page" key="path-0">
                        <Link to="/">Home</Link>
                    </li>
                    {paths.map((path, id) => (
                        <li className="breadcrumb-item" aria-current="page" key={`path-${id}`}>
                            <Link to={path}>{path}</Link>
                        </li>
                    ))}
                    <li className="breadcrumb-item active" aria-current="page">
                        {lastPath}
                    </li>
                </ol>
                {loginDisplay}
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
                            {/* <li className="nav-item">
                            <Link className="nav-link text-dark" to="./createUser">
                                Создать пользователя
                            </Link>
                        </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};
