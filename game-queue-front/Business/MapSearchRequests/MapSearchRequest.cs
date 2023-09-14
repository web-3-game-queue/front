using System.ComponentModel.DataAnnotations;
using game_queue_front.Business.Maps;
using game_queue_front.Business.RequestMaps;
using game_queue_front.Business.Users;

namespace game_queue_front.Business.MapSearchRequests {
    public class MapSearchRequest {
        [Key]
        public int Id { get; set; }

        public int CreatorUserId { get; set; }
        public User CreatorUser { get; set; } = null!;

        public MapSearchRequestStatus Status { get; set; }

        public List<RequestMap> RequestMaps { get; set; } = new List<RequestMap>();
    }
}
