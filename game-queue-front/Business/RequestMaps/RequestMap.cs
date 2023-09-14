using System.ComponentModel.DataAnnotations;
using game_queue_front.Business.Maps;
using game_queue_front.Business.MapSearchRequests;

namespace game_queue_front.Business.RequestMaps {
    public class RequestMap {
        [Key]
        public int Id { get; set; }

        public int SearchRequestId { get; set; }
        public MapSearchRequest SearchRequest { get; set; } = null!;

        public int MapId { get; set; }
        public Map Map { get; set; } = null!;
    }
}
