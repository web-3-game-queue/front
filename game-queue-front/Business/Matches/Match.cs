﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using game_queue_front.Business.Maps;
using game_queue_front.Business.Users;

namespace game_queue_front.Business.Matches {
    [Table("matches")]
    public class Match {
        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        public string Name { get; set; } = null!;

        public int MapId { get; set; }
        public Map Map { get; set; } = null!;

        public ICollection<User> Users { get; } = new List<User>();
    }
}
