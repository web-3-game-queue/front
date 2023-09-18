using game_queue_front.Business;
using game_queue_front.Service;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace game_queue_front.Pages {
    public class MapsModel: PageModel {
        public string? FilterMapName { get; set; }
        public decimal? FilterMapPrice { get; set; }

        public List<Map> Maps { get; set; } = new List<Map>();

        private IWebHostEnvironment env { get; set; }

        private readonly MapService mapService;

        public MapsModel(
            IWebHostEnvironment env,
            MapService mapService
        ) {
            this.env = env;
            this.mapService = mapService;
        }

        public void OnGet(string? filterMapName, decimal? filterMapPrice) {
            var mapsPath = "./static/maps.json";

            if (StaticDataProvider.Instance == null) {
                StaticDataProvider.InstantiateMatches(
                    env.WebRootFileProvider.GetFileInfo(mapsPath).PhysicalPath
                );
            }

            FilterMapName = filterMapName;
            FilterMapPrice = filterMapPrice;

            Maps = loadMaps();
        }

        private List<Map> loadMaps() => mapService
                .FilterMapsByNameAndMaxPrice(StaticDataProvider.Instance!.Maps, FilterMapName ?? "", FilterMapPrice ?? decimal.MaxValue)
                .ToList();
    }
}
