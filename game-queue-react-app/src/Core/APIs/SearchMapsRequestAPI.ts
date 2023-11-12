import axios from "axios";
import { BASE_API_URL } from "../../Configuration";
import { SearchMapsRequest, SearchMapsRequestStatus, SearchMapsRequestVerbose } from "../../Autogenerated/Backend";

export abstract class SearchMapsRequestAPI {
    public static readonly SEARCH_MAPS_REQUEST_API_PATH = 'search_maps_request';

    public static GetRequest = async (requestId: number) => {
        const url = `${BASE_API_URL}/${this.SEARCH_MAPS_REQUEST_API_PATH}/${requestId}`;
        try {
            const result = await axios.get(url);
            const searchMapRequestVerbose: SearchMapsRequestVerbose = result.data;
            return searchMapRequestVerbose;
        } catch (error) {
            return null;
        }
    }

    public static GetRequests = async () => {
        const url = `${BASE_API_URL}/${this.SEARCH_MAPS_REQUEST_API_PATH}`;
        try {
            const result = await axios.get(url);
            const searchMapRequests: SearchMapsRequest[] = result.data;
            return searchMapRequests;
        } catch (error) {
            return null;
        }
    }

    public static GetAllRequests = async (beginDate?: Date, endDate?: Date, username?: string) => {
        try {
            const url = new URL(`${BASE_API_URL}/${this.SEARCH_MAPS_REQUEST_API_PATH}/all`);
            if (beginDate) {
                url.searchParams.append('begin_date', beginDate.toISOString());
            }
            if (endDate) {
                url.searchParams.append('end_date', endDate.toISOString());
            }
            if (username) {
                url.searchParams.append('username', username);
            }
            const result = await axios.get(url.toString());
            const requests: SearchMapsRequest[] = result.data;
            return requests;
        } catch (error) {
            return null;
        }
    }

    public static GetCurrent = async () => {
        const url = `${BASE_API_URL}/${this.SEARCH_MAPS_REQUEST_API_PATH}/current`;
        try {
            const result = await axios.get(url);
            if (result.status != 200) {
                return null;
            }
            const searchMapRequestVerbose: SearchMapsRequestVerbose = result.data;
            return searchMapRequestVerbose;
        } catch (error) {
            return null;
        }
    }

    public static AddMapToRequest = async (mapId: number) => {
        const url = `${BASE_API_URL}/${this.SEARCH_MAPS_REQUEST_API_PATH}/add_map/${mapId}`;
        try {
            const result = await axios.put(url);
            const searchMapsRequestId: number = result.data;
            return searchMapsRequestId;
        } catch (error) {
            return null;
        }
    }

    public static RemoveMapFromRequest = async (mapId: number) => {
        const url = `${BASE_API_URL}/${this.SEARCH_MAPS_REQUEST_API_PATH}/remove_map/${mapId}`;
        try {
            const result = await axios.delete(url);
            return result.status == 200;
        } catch (error) {
            return null;
        }
    }

    public static ComposeRequest = async (requestId: number) => {
        const url = `${BASE_API_URL}/${this.SEARCH_MAPS_REQUEST_API_PATH}/compose/${requestId}`;
        try {
            const result = await axios.put(url);
            return result.status == 200;
        } catch (error) {
            return null;
        }
    }

    public static DeleteRequest = async (requestId: number) => {
        const url = `${BASE_API_URL}/${this.SEARCH_MAPS_REQUEST_API_PATH}/delete/${requestId}`;
        try {
            const result = await axios.delete(url);
            return result.status == 200;
        } catch (error) {
            return null;
        }
    }

    public static CancelRequest = async (requestId: number) => {
        const url = `${BASE_API_URL}/${this.SEARCH_MAPS_REQUEST_API_PATH}/cancel/${requestId}`;
        try {
            const result = await axios.put(url);
            return result.status == 200;
        } catch (error) {
            return null;
        }
    }

    public static FinishRequest = async (requestId: number) => {
        const url = `${BASE_API_URL}/${this.SEARCH_MAPS_REQUEST_API_PATH}/finish/${requestId}`;
        try {
            const result = await axios.put(url);
            return result.status == 200;
        } catch (error) {
            return null;
        }
    }

    public static SetStatus = async (requestId: number, status: SearchMapsRequestStatus) => {
        switch (status) {
            case SearchMapsRequestStatus.Cancelled:
                return await this.CancelRequest(requestId);

            case SearchMapsRequestStatus.Composed:
                return await this.ComposeRequest(requestId);

            case SearchMapsRequestStatus.Deleted:
                return await this.DeleteRequest(requestId);

            case SearchMapsRequestStatus.Done:
                return await this.FinishRequest(requestId);

            default:
                return null;
        }
    }
}