import { FC } from 'react';
import { Map } from '../../../Core/Models/Map';
import { MapCardComponent } from '../MapCard/MapCard';

interface MapListProps {
    maps: Map[];
}

export const MapListComponent: FC<MapListProps> = ({ maps }: MapListProps) => {
    return (
        <div className="container" style={{ display: 'flex' }}>
            {/* <div>
        <form method="get" class="card p-2 m-3" style="width: 250px">
            <div style="display: flex">
                <h5>Фильтры</h5>
            </div>
            <div class="mb-3">
                <label for="FilterMapName" class="form-label">Название карты</label>
                <input type="text" class="form-control" id="FilterMapName" name="FilterMapName" value="@Model.FilterMapName">
            </div>
            <div class="mb-3">
                <label for="FilterMapPrice" class="form-label">Стоимость входа</label>
                <input type="number" class="form-control" id="FilterMapPrice" name="FilterMapPrice" value="@Model.FilterMapPrice" min="0">
            </div>
            <button type="submit" class="btn btn-primary">Применить</button>
        </form>
    </div> */}
            <div className="row text-center" style={{ width: '100%' }}>
                <h5 className="p-0">Карты:</h5>
                {maps.map(MapCardComponent)}
                {/* @foreach (var map in Model.Maps){' '}
                {
                    <div className="col mb-3 mb-sm-0 p-0 p-xl-3">
                        <div className="card" style={{ width: 'auto' }}>
                            <img className="card-img-top" src="@map.CoverImageUrl" alt="Minimap image" />
                            <div className="card-body">
                                <h5 className="card-title">@map.ToString()</h5>
                                <h6>
                                    Стоимость входа: <strong>@map.EntryPrice$</strong>
                                </h6>
                                <a href="Maps/@map.Id/" className="btn btn-primary">
                                    More details
                                </a>
                            </div>
                        </div>
                    </div>
                } */}
            </div>
        </div>
    );
};
