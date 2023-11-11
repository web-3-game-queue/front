import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useLogin } from '../../Core/Storage/DataSlice';

export const IndexComponent: FC = () => {
    const login = useLogin();

    const invite =
        login === null ? (
            <>
                <Link to="/Login">
                    <h2>Войти</h2>
                </Link>
                <br />
                <Link to="/register">
                    <h2>Зарегистрироваться</h2>
                </Link>
            </>
        ) : (
            <Link to="/maps">
                <h2>К картам</h2>
            </Link>
        );

    return (
        <>
            Well, hello there
            <br />
            {invite}
        </>
    );
};
