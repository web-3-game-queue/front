import { FC } from "react";
import { Map } from "../../../Core/Models/Map";
import { MAP_COVER_PLACEHOLDER_URL } from "../../../Configuration";

export const MapCardComponent: FC<Map> = (map) => <div className="card">
    <h2>Карта с номером #@Model.MapId не найдена</h2>
    {
        map.coverImageUrl 
            ? <img className="card-img-top p-3" src={map.coverImageUrl} alt="Minimap image" style="width: 40rem"/>
            : <img className="card-img-top p-3" src={MAP_COVER_PLACEHOLDER_URL} alt="Minimap image" style="width: 40rem"/>
    }
    <img className="card-img-top p-3" src="@Model.Map.CoverImageUrl" alt="Minimap image" style="width: 40rem"/>
    <div className="card-body">
        <h3 className="card-title">@Model.Map.Name</h3>
        @Model.Map.ToString()
        <br />
        Стоимость входа: <strong>@Model.Map.EntryPrice$</strong>
        @if (Model.Map.Status == Business.Maps.MapStatus.Deleted) {
            <h5>Недоступна.</h5>
        } else {
            <form method="post">
                <button className="btn btn-danger">Удалить</button>
            </form>
        }
    </div>
}
</div>