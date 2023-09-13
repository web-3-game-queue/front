using game_queue_front.Business;
using game_queue_front.Service;
using Microsoft.AspNetCore.Mvc;

namespace game_queue_front.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class MapsController: ControllerBase {
        private readonly MapService mapService;

        public MapsController(
            MapService mapService
        ) {
            this.mapService = mapService;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Map>> Get(string? filterName = null, decimal? filterPrice = null) {
            var filtered = mapService
                .FilterMapsByNameAndMaxPrice(StaticDataProvider.Instance.Maps, filterName, filterPrice)
                .ToList();
            return filtered;
        }
    }
}
