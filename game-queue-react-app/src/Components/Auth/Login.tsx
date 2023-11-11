import { FC, useRef } from 'react';
import { AuthenticationAPI } from '../../Core/APIs/AuthenticationAPI';
import { setAuthorization } from '../../Core/Cookies';
import { Link } from 'react-router-dom';

export const LoginComponent: FC = () => {
    const loginInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const errorMsg = useRef<HTMLDivElement>(null);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        event.stopPropagation();
        const login = loginInput.current?.value ?? '';
        const password = passwordInput.current?.value ?? '';
        const token = await AuthenticationAPI.Login(login, password);
        errorMsg.current?.classList.remove('d-none');
        if (token !== null) {
            setAuthorization(token);
            errorMsg.current?.classList.add('d-none');
        }
    }

    return (
        <div>
            <form method="get" className="card p-2 m-3 needs-validation" style={{ width: '250px' }} onSubmit={(e) => handleSubmit(e)}>
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
                    <input type="password" className="form-control" id="Password" name="Password" min="0" ref={passwordInput} required />
                </div>
                <button type="submit" className="btn btn-primary">
                    Войти
                </button>
                <div className="p-2 mb-3 text-bg-danger rounded-3 mt-3 d-none" ref={errorMsg}>
                    Ошибка входа: неверный логин или пароль.
                </div>
            </form>
            Еще нет аккаунта? <Link to="/register">Зарегистрироваться.</Link>
        </div>
    );
};
