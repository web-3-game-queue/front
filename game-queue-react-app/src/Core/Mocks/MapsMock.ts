import { Map, MapStatus } from "../../Autogenerated/Backend";

export const MapsMock: Map[] = [
    {
        id: 1,
        name: 'de_dust2',
        width: 100,
        height: 150,
        maxPlayersCount: 30,
        coverImageUrl: 'https://upload.wikimedia.org/wikipedia/ru/thumb/5/5a/De_dust2_radar.webp/1000px-De_dust2_radar.webp.png',
        description: 'Пример описания',
        mapStatus: MapStatus.Available,
        mock: true
    },
    {
        id: 2,
        name: 'Commencement',
        width: 1000,
        height: 1000,
        maxPlayersCount: 4,
        coverImageUrl: 'https://static.wikia.nocookie.net/riskofrain2_gamepedia_en/images/1/1d/Commencement.png',
        description: '...con lentitud poderosa',
        mapStatus: MapStatus.Available,
        mock: true
    },
    {
        id: 3,
        name: 'Lionspire',
        width: 200,
        height: 120,
        maxPlayersCount: 64,
        coverImageUrl: 'https://chivalry.wiki.gg/images/thumb/3/38/Lionspire_HD_5.jpg/800px-Lionspire_HD_5.jpg',
        description: 'FOR MALRIC! AGATHA RISES! THE NORTH WILL DROWN IN BLOOD!',
        mapStatus: MapStatus.Available,
        mock: true
    }
];