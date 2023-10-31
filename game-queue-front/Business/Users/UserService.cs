using game_queue_front.Database;

namespace game_queue_front.Business.Users {
    public class UserService {
        private readonly GameQueueContext context;
        private readonly PasswordHasherService passwordHasher;

        public UserService(
            GameQueueContext context,
            PasswordHasherService passwordHasher
        ) {
            this.context = context;
            this.passwordHasher = passwordHasher;
        }

        public async Task<User> CreateUser(
            string name,
            string password,
            int level,
            int? enteredMatchId
        ) {
            var hashedPassword = passwordHasher.HashPassword(password, name);
            var user = new User {
                Name = name,
                HashedPassword = hashedPassword,
                Level = level
            };
            await context.Users.AddAsync(user);
            context.SaveChanges();
            return user;
        }
    }
}
