using game_queue_front.Business.Maps;
using game_queue_front.Database;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace game_queue_front.Pages {
    public class MapsModel: PageModel {
        public string? FilterMapName { get; set; }
        public decimal? FilterMapPrice { get; set; }

        public List<Map> Maps { get; set; } = new List<Map>();

        private readonly MapService mapService;

        public MapsModel(
            MapService mapService
        ) {
            this.mapService = mapService;
        }

        public void OnGet(string? filterMapName, decimal? filterMapPrice) {
            FilterMapName = filterMapName;
            FilterMapPrice = filterMapPrice;

            Maps = loadMaps();
        }

        private List<Map> loadMaps() => mapService
                .GetMapsFilteredByNameAndMaxPriceAndAvailable(FilterMapName ?? "", FilterMapPrice ?? decimal.MaxValue);
    }
}
