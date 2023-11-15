import CookieProvider from 'universal-cookie';
import { TOKEN_COOKIE } from '../Configuration';

export const COOKIES = new CookieProvider();

export const setAuthorization = (token: string) => {
    COOKIES.set(TOKEN_COOKIE, `Bearer ${token}`, { sameSite: true, secure: true });
}