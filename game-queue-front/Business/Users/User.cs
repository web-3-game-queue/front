using System.ComponentModel.DataAnnotations;
using game_queue_front.Business.MapSearchRequests;
using Microsoft.EntityFrameworkCore;

namespace game_queue_front.Business.Users {
    [Index(nameof(Name), IsUnique = true)]
    public class User {
        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        public string Name { get; set; } = null!;

        public string HashedPassword { get; set; } = null!;

        [Range(0, int.MaxValue)]
        public int Level { get; set; }

        public int? MatchId { get; set; }

        public List<MapSearchRequest> SearchRequests { get; } = new List<MapSearchRequest>();
    }
}
