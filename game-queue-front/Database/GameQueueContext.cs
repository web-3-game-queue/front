﻿using game_queue_front.Business.Maps;
using game_queue_front.Business.Matches;
using game_queue_front.Business.Users;
using Microsoft.EntityFrameworkCore;

namespace game_queue_front.Database {
    public class GameQueueContext: DbContext {
        public DbSet<Map> Maps { get; set; } = null!;
        public DbSet<Match> Matches { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;

        public GameQueueContext(DbContextOptions<GameQueueContext> options) : base(options) { 
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) =>
            optionsBuilder.UseSnakeCaseNamingConvention();
    }
}