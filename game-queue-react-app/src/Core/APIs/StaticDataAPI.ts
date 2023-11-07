import { BASE_API_URL, MAP_COVER_PLACEHOLDER_FILENAME_PATH } from "../../Configuration";
import { Map } from "../Models/Map";

export abstract class StaticDataAPI {
    public static readonly STATIC_DATA_API_PATH = 'static_data';

    public static FormFileUrl = (filePath: string) =>
        `${BASE_API_URL}/${this.STATIC_DATA_API_PATH}/${filePath}`;

    public static FormMapCoverUrl = (map: Map) => {
        const coverImagePath = map.coverImageUrl ?? MAP_COVER_PLACEHOLDER_FILENAME_PATH;
        return this.FormFileUrl(coverImagePath);
    }

    public static GetFile = async (filePath: string) => {
        const fileUrl = this.FormFileUrl(filePath);
        const result = await fetch(fileUrl, { method: 'GET' });
        return result;
    }
}