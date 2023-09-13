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
    }
}
