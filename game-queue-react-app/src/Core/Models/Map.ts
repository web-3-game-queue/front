import { MapStatus } from "./MapStatus";

export type Map = {
    id: number,
    name: string,
    width: number,
    height: number,
    maxPlayersCount: number,
    coverImageUrl?: string,
    description?: string,
    mapStatus: MapStatus
};

export const MapToString = (map: Map) =>
    `${map.name} ${map.width}x${map.height} (${map.maxPlayersCount}p)`;