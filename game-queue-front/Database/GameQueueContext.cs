using game_queue_front.Business.Maps;
using game_queue_front.Business.MapSearchRequests;
using game_queue_front.Business.Users;
using Microsoft.EntityFrameworkCore;

namespace game_queue_front.Database {
    public class GameQueueContext: DbContext {
        public DbSet<Map> Maps { get; set; } = null!;
        public DbSet<User> Users { get; set; } = null!;

        public GameQueueContext(DbContextOptions<GameQueueContext> options) : base(options) {
            //Database.Migrate();
            //Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder
                .Entity<Map>()
                .Property(m => m.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => (MapStatus)Enum.Parse(typeof(MapStatus), v)
                 )
                .HasDefaultValue(MapStatus.Available);

            modelBuilder
                .Entity<MapSearchRequest>()
                .Property(m => m.Status)
                .HasConversion(
                    v => v.ToString(),
                    v => (MapSearchRequestStatus)Enum.Parse(typeof(MapSearchRequestStatus), v)
                 );
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) =>
            optionsBuilder.UseSnakeCaseNamingConvention();
    }
}
