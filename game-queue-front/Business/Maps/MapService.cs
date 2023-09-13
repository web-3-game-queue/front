using System.Collections;
using game_queue_front.Database;
using Microsoft.EntityFrameworkCore;

namespace game_queue_front.Business.Maps {
    public class MapService {
        private readonly GameQueueContext context;

        public MapService(GameQueueContext context) {
            this.context = context;
        }

        public async Task<List<Map>> GetMapsFilteredByNameAndMaxPrice(string filterName, decimal maxPrice) =>
            await context.Maps
                .Where(x => x.Name.Contains(filterName) && x.EntryPrice <= maxPrice)
                .ToListAsync();
    }
}
