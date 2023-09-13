using game_queue_front.Business.Maps;
using game_queue_front.Database;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace game_queue_front.Pages.Maps {
    public class MapModel : PageModel {
        public int MapId { get; set; }
        public Map? Map { get; set; }

        private readonly GameQueueContext context;

        public MapModel(GameQueueContext context) {
            this.context = context;
        }

        public async void OnGet() {
            MapId = Convert.ToInt32(RouteData.Values["id"]);
            Map = await context.Maps.FindAsync(MapId);
        }
    }
}
