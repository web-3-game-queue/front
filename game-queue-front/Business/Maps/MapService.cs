using game_queue_front.Database;
using Microsoft.EntityFrameworkCore;

namespace game_queue_front.Business.Maps {
    public class MapService {
        private readonly GameQueueContext context;

        public MapService(GameQueueContext context) {
            this.context = context;
        }

        public List<Map> GetMapsFilteredByNameAndMaxPriceAndAvailable(string filterName, decimal maxPrice) =>
            context.Maps
                .Where(x =>
                    x.Name.Contains(filterName)
                    && x.EntryPrice <= maxPrice
                    && x.Status == MapStatus.Available
                )
                .ToList();

        public void MarkMapAsDeleted(int mapId) {
            var deletedNum = (int)MapStatus.Deleted;
            context.Database.ExecuteSqlRaw($"UPDATE maps SET status = {deletedNum} WHERE id = {mapId};");
        }
    }
}
