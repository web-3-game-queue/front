using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace game_queue_front.Pages {
    public class MatchesModel : PageModel {
        public string FilterMapName { get; set; } = "KAVO";
        public string FilterMapPrice { get; set; } = "CHEVO";

        public void OnGet() {
            Console.WriteLine($"name: {FilterMapName}, price: {FilterMapPrice}");
        }
        
        public void OnPost(string filterMapName, string filterMapPrice) {
            Console.WriteLine($"POSTING, name: {filterMapName}, price: {filterMapPrice}");
        }
    }
}
