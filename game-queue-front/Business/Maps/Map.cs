using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace game_queue_front.Business.Maps {
    [Table("maps")]
    public class Map {
        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        public string Name { get; set; } = null!;

        [Range(0, int.MaxValue)]
        public int Width { get; set; }

        [Range(0, int.MaxValue)]
        public int Height { get; set; }

        [Range(0, int.MaxValue)]
        public int MaxPlayersCount { get; set; }

        public string CoverImageUrl { get; set; } = null!;

        [Range(0, double.MaxValue)]
        public decimal EntryPrice { get; set; }

        public Map() { }

        public override string ToString() {
            return string.Format("{0} {1}x{2} ({3}p)", Name, Width, Height, MaxPlayersCount);
        }
    }
}
