using game_queue_front.Business;
using game_queue_front.Business.Maps;
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
        public ActionResult<IEnumerable<Map>> Get(string filterName = "", decimal maxPrice = decimal.MaxValue)
            => mapService
                .GetMapsFilteredByNameAndMaxPriceAndAvailable(filterName, maxPrice);

        [HttpDelete("{id}/delete")]
        public string DeleteMapById(int id) {
            mapService.MarkMapAsDeleted(id);
            return $"Deleted map with id {id}";
        }

        [HttpPut("{id}/restore")]
        public string RestoreMapById(int id) {
            mapService.MarkMapAsAvailable(id);
            return $"Restored map with id {id}";
        }

        [HttpGet("all")]
        public ActionResult<IEnumerable<Map>> GetAll() => mapService.GetAllMaps();
    }
}
