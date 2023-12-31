import { FC, useRef } from 'react';
import { AuthenticationAPI } from '../../Core/APIs/AuthenticationAPI';
import { setAuthorization } from '../../Core/Cookies';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentRequestId, setAuth, setMapIds } from '../../Core/Storage/DataSlice';
import { SearchMapsRequestAPI } from '../../Core/APIs/SearchMapsRequestAPI';

export const LoginComponent: FC = () => {
    const loginInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const errorMsg = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        event.stopPropagation();
        const login = loginInput.current?.value ?? '';
        const password = passwordInput.current?.value ?? '';
        const token = await AuthenticationAPI.Login(login, password);
        errorMsg.current?.classList.remove('d-none');
        if (token !== null) {
            errorMsg.current?.classList.add('d-none');
            setAuthorization(token);
            const me = await AuthenticationAPI.GetMe();
            dispatch(
                setAuth({
                    login: me.name ?? '[ДАННЫЕ ███████]',
                    selfId: me.id!
                })
            );
            const currentRequest = await SearchMapsRequestAPI.GetCurrent();
            console.log('currentRequest :>> ', currentRequest);
            if (currentRequest !== null) {
                dispatch(setCurrentRequestId(currentRequest.id!));
                dispatch(setMapIds(currentRequest.maps!.map((x) => x.id!)));
            }
            navigate(-1);
        }
    }

    return (
        <div>
            <form method="get" className="card p-2 m-3 needs-validation" style={{ width: '250px', display: 'inline-block' }} onSubmit={(e) => handleSubmit(e)}>
                <div style={{ display: 'flex' }}>
                    <h5>Вход в систему</h5>
                </div>
                <div className="mb-3">
                    <label htmlFor="Login" className="form-label">
                        Логин
                    </label>
                    <input type="text" className="form-control" id="Login" name="Login" ref={loginInput} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">
                        Пароль
                    </label>
                    <input type="password" className="form-control" id="Password" name="Password" ref={passwordInput} required />
                </div>
                <button type="submit" className="btn btn-primary">
                    Войти
                </button>
                <div className="p-2 mb-3 text-bg-danger rounded-3 mt-3 d-none" ref={errorMsg}>
                    Ошибка входа: неверный логин или пароль.
                </div>
            </form>
            <br />
            Еще нет аккаунта? <Link to="/register">Зарегистрироваться.</Link>
        </div>
    );
};
