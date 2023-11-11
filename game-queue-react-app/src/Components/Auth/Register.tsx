import { FC, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AuthorizationAPI } from '../../Core/APIs/AuthorizationAPI';

export const RegisterComponent: FC = () => {
    const loginInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);
    const repeatPasswordInput = useRef<HTMLInputElement>(null);
    const errorMsg = useRef<HTMLDivElement>(null);

    function showError(text: string) {
        if (errorMsg.current === null) {
            return;
        }
        const e = errorMsg.current;
        e.classList.remove('d-none');
        e.innerText = text;
    }

    function hideError() {
        errorMsg.current?.classList.add('d-none');
    }

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const login = loginInput.current?.value ?? '';
        const password = passwordInput.current?.value ?? '';
        const repeatPassword = repeatPasswordInput.current?.value ?? '';
        if (password != repeatPassword) {
            showError('Пароли не совпадают');
            return;
        }
        const token = await AuthorizationAPI.Register(login, password);
        if (token === null) {
            showError('Пользователь с таким логином уже зарегистрирован.');
        } else {
            hideError();
        }
    }

    return (
        <div>
            <form method="get" className="card p-2 m-3" style={{ width: '250px', display: 'inline-block' }} onSubmit={(e) => handleSubmit(e)}>
                <div style={{ display: 'flex' }}>
                    <h5>Регистрация</h5>
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
                <div className="mb-3">
                    <label htmlFor="RepeatPassword" className="form-label">
                        Повторите пароль
                    </label>
                    <input type="password" className="form-control" id="RepeatPassword" name="RepeatPassword" min="0" ref={repeatPasswordInput} required />
                </div>
                <button type="submit" className="btn btn-primary">
                    Зарегистрироваться
                </button>
                <div className="p-2 mb-3 text-bg-danger rounded-3 mt-3 d-none" ref={errorMsg}>
                    Ошибка входа: неверный логин или пароль.
                </div>
            </form>
            <br />
            Уже есть аккаунт? <Link to="/login">Войти.</Link>
        </div>
    );
};
