using game_queue_front.Business.Users;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace game_queue_front.Pages {
    public class CreateUserModel: PageModel {
        public User? CreatedUser;

        private readonly UserService userService;

        public CreateUserModel(UserService userService) {
            this.userService = userService;
        }

        public void OnGet() {
        }

        public async void OnPost(
            string username, 
            string password,
            int level,
            int? matchId
        ) {
            var user = await userService.CreateUser(username, password, level, matchId);
            CreatedUser = user;
        }
    }
}
