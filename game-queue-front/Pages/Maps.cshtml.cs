using game_queue_front.Business.Maps;
using game_queue_front.Database;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;

namespace game_queue_front.Pages {
    public class MapsModel: PageModel {
        public string? FilterMapName { get; set; }
        public decimal? FilterMapPrice { get; set; }

        public List<Map> Maps { get; set; } = new List<Map>();

        private readonly MapService mapService;
        private readonly GameQueueContext context;

        public MapsModel(
            MapService mapService,
            GameQueueContext context
        ) {
            this.mapService = mapService;
            this.context = context;
        }

        public async void OnGet() {
            Maps = await context.Maps.ToListAsync();
        }

        public async void OnPost(string? filterMapName, decimal? filterMapPrice) {
            FilterMapName = filterMapName;
            FilterMapPrice = filterMapPrice;

            Maps = await mapService
                .GetMapsFilteredByNameAndMaxPrice(filterMapName ?? "", filterMapPrice ?? decimal.MaxValue);
        }
    }
}
