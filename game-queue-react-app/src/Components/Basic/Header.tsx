import { FC } from 'react';
import { Link } from 'react-router-dom';

export const HeaderComponent: FC = () => (
    <header>
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
                        <li className="nav-item">
                            <Link className="nav-link text-dark" to="./createUser">
                                Создать пользователя
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
);
