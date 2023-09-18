using game_queue_front.Database;
using Microsoft.EntityFrameworkCore;

namespace game_queue_front.Business.Maps {
    public class MapService {
        private readonly GameQueueContext context;

        public MapService(GameQueueContext context) {
            this.context = context;
        }

        public List<Map> GetAllMaps() => context.Maps.ToList();

        public List<Map> GetMapsFilteredByNameAndMaxPriceAndAvailable(string filterName, decimal maxPrice) =>
            context.Maps
                .Where(x =>
                    x.Name.Contains(filterName)
                    && x.EntryPrice <= maxPrice
                    && x.Status == MapStatus.Available
                )
                .ToList();

        public void MarkMapAsDeleted(int mapId) {
            var deletedNum = MapStatus.Deleted.ToString();
            context.Database.ExecuteSqlRaw($"UPDATE maps SET status = '{deletedNum}' WHERE id = {mapId};");
        }

        public void MarkMapAsAvailable(int mapId) {
            var map = context.Maps.Find(mapId);
            map.Status = MapStatus.Available;
            context.Maps.Update(map);
            context.SaveChanges();
        }
    }
}
