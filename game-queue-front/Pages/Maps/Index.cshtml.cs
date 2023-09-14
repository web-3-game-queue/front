using game_queue_front.Business.Maps;
using game_queue_front.Database;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace game_queue_front.Pages.Maps {
    public class MapModel : PageModel {
        public int MapId { get; set; }
        public Map? Map { get; set; }

        private readonly GameQueueContext context;
        private readonly MapService mapService;

        public MapModel(
            GameQueueContext context,
            MapService mapService
        ) {
            this.context = context;
            this.mapService = mapService;
        }

        public void OnGet() {
            MapId = getMapId();
            Map = context.Maps.Find(MapId);
        }

        public void OnPost() {
            MapId = getMapId();
            mapService.MarkMapAsDeleted(MapId);
            Map = context.Maps.Find(MapId);
        }

        private int getMapId() => Convert.ToInt32(RouteData.Values["id"]);
    }
}
