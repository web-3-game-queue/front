import axios from "axios";
import { BASE_API_URL } from "../../Configuration";

export abstract class AuthenticationAPI {
    public static readonly AUTHENTICATION_API_PATH = 'authentication';

    public static GetMe = async () => {
        const url = `${BASE_API_URL}/${this.AUTHENTICATION_API_PATH}`;
        const result = await axios.get(url);
        const claims: string[] = result.data;
        return claims;
    }

    public static Login = async (login: string, password: string) => {
        try {
            const url = new URL(`${BASE_API_URL}/${this.AUTHENTICATION_API_PATH}/login`);
            url.searchParams.append('login', login);
            url.searchParams.append('password', password);
            const result = await axios.post(url.toString());
            // const result = await fetch(url, { method: 'POST' });
            const token: string = await result.data;
            return token;
        } catch (error) {
            return null;
        }
    }
}