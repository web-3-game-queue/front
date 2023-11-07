import { BASE_API_URL } from "../../Configuration";
import { Map } from "../Models/Map";

export abstract class MapAPI {
    public static readonly MAP_API_PATH = 'map';

    public static GetMaps = async () => {
        const url = `${BASE_API_URL}/${this.MAP_API_PATH}/`;
        const result = await fetch(url, { method: 'GET' });
        const maps: Map[] = await result.json();
        return maps;
    }

    public static GetMap = async (mapId: number) => {
        const url = `${BASE_API_URL}/${this.MAP_API_PATH}/${mapId}`;
        const result = await fetch(url, { method: 'GET' });
        if (result.status == 400) {
            return null;
        }
        const map: Map = await result.json();
        return map;
    }
}