import { FC, useRef } from 'react';
import { AuthenticationAPI } from '../../Core/APIs/AuthenticationAPI';

export const LoginComponent: FC = () => {
    const loginInput = useRef<HTMLInputElement>(null);
    const passwordInput = useRef<HTMLInputElement>(null);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        const login = loginInput.current?.value ?? '';
        const password = passwordInput.current?.value ?? '';
        const loginResult = await AuthenticationAPI.Login(login, password);
        console.log('loginResult :>> ', loginResult);
    }

    return (
        <div>
            <form method="get" className="card p-2 m-3" style={{ width: '250px' }} onSubmit={(e) => handleSubmit(e)}>
                <div style={{ display: 'flex' }}>
                    <h5>Вход в систему</h5>
                </div>
                <div className="mb-3">
                    <label htmlFor="Login" className="form-label">
                        Логин
                    </label>
                    <input type="text" className="form-control" id="Login" name="Login" ref={loginInput} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Password" className="form-label">
                        Пароль
                    </label>
                    <input type="password" className="form-control" id="Password" name="Password" min="0" ref={passwordInput} />
                </div>
                <button type="submit" className="btn btn-primary">
                    Войти
                </button>
            </form>
        </div>
    );
};
