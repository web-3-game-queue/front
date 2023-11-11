import axios from "axios";
import { BASE_API_URL } from "../../Configuration";

export abstract class AuthorizationAPI {
    public static readonly AUTHORIZATION_API_PATH = 'authorization';

    public static Register = async (login: string, password: string) => {
        try {
            const url = new URL(`${BASE_API_URL}/${this.AUTHORIZATION_API_PATH}`);
            url.searchParams.append('name', login);
            url.searchParams.append('password', password);
            const result = await axios.post(url.toString());
            return result;
        } catch (error) {
            return null;
        }
    }
}