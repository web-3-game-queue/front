using game_queue_front.Business;
using game_queue_front.Service;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace game_queue_front.Pages {
    public class MatchesModel: PageModel {
        public string? FilterMapName { get; set; }
        public decimal? FilterMapPrice { get; set; }
        public List<Match> Matches { get; set; } = new List<Match>();

        private IWebHostEnvironment env { get; set; }

        private MatchService matchService { get; set; }

        public MatchesModel(
            IWebHostEnvironment env,
            MatchService matchService
        ) {
            this.env = env;
            this.matchService = matchService;
        }

        public void OnGet() {
            var mapsPath = "./static/maps.json";
            var playersPath = "./static/players.json";
            var matchesPath = "./static/matches.json";

            if (StaticDataProvider.Instance == null) {
                StaticDataProvider.InstantiateMatches(
                    env.WebRootFileProvider.GetFileInfo(mapsPath).PhysicalPath,
                    env.WebRootFileProvider.GetFileInfo(playersPath).PhysicalPath,
                    env.WebRootFileProvider.GetFileInfo(matchesPath).PhysicalPath
                );
            }

            Matches = new List<Match>(StaticDataProvider.Instance.Matches);
        }

        public void OnPost(string filterMapName, decimal? filterMapPrice) {
            FilterMapName = filterMapName;
            FilterMapPrice = filterMapPrice;

            Matches = matchService
                .FilterMatchesByMapNameAndMaxPrice(StaticDataProvider.Instance.Matches, filterMapName, filterMapPrice)
                .ToList();
        }
    }
}
