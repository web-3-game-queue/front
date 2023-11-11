import axios from "axios";
import { BASE_API_URL } from "../../Configuration";
import { User } from "../../Autogenerated/Backend";

export abstract class AuthenticationAPI {
    public static readonly AUTHENTICATION_API_PATH = 'authentication';

    public static GetMe = async () => {
        const url = `${BASE_API_URL}/${this.AUTHENTICATION_API_PATH}`;
        const result = await axios.get(url);
        const user: User = result.data;
        return user;
    }

    public static Login = async (login: string, password: string) => {
        try {
            const url = new URL(`${BASE_API_URL}/${this.AUTHENTICATION_API_PATH}/login`);
            url.searchParams.append('login', login);
            url.searchParams.append('password', password);
            const result = await axios.post(url.toString());
            const token: string = result.data;
            return token;
        } catch (error) {
            return null;
        }
    }

    private static readonly MOD_ROLES = ['Moderator', 'Administrator'];
    public static IsMod = async () => {
        try {
            const me = await this.GetMe();
            for (const mod_role of this.MOD_ROLES) {
                if (me.claims?.indexOf(mod_role) != -1) {
                    console.log('me :>> ', me);
                    console.log('mod_role :>> ', mod_role);
                    return true;
                }
            }
            return false;
        } catch (error) {
            return false;
        }
    }
}