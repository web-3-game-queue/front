import { BASE_API_URL } from "../../Configuration";
import { Map } from "../Models/Map";

export abstract class MapAPI {
    public static readonly MAP_API_PATH = 'map';

    public static GetMaps = async (filterName?: string, maxPlayersCount?: number) => {
        const url = new URL(`${BASE_API_URL}/${this.MAP_API_PATH}/`);
        if (filterName) {
            url.searchParams.append('filterName', filterName);
        }
        if (maxPlayersCount) {
            url.searchParams.append('maxPlayersCount', maxPlayersCount.toString());
        }
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

    public static DeleteMap = async (mapId: number) => {
        const url = `${BASE_API_URL}/${this.MAP_API_PATH}/delete/${mapId}`;
        await fetch(url, { method: 'DELETE' });
        console.log('Marked as deleted map with id', mapId);
    }
}