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

        public void OnGet() {
            var mapsPath = "./static/maps.json";

            if (StaticDataProvider.Instance == null) {
                StaticDataProvider.InstantiateMatches(
                    env.WebRootFileProvider.GetFileInfo(mapsPath).PhysicalPath
                );
            }

            Maps = new List<Map>(StaticDataProvider.Instance.Maps);
        }

        public void OnPost(string filterMapName, decimal? filterMapPrice) {
            FilterMapName = filterMapName;
            FilterMapPrice = filterMapPrice;

            Maps = mapService
                .FilterMapsByNameAndMaxPrice(StaticDataProvider.Instance.Maps, filterMapName, filterMapPrice)
                .ToList();
        }
    }
}
