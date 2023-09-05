using game_queue_front.Model;
using Newtonsoft.Json;

namespace game_queue_front.Service {
	public static class StaticDataProvider {
		public static List<Match> LoadMatches(
			string mapsPath,
			string playersPath,
			string matchNamesPath
		) {
			List<Map> maps;
			using (var mapReader = new StreamReader(mapsPath)) {
				var mapsData = mapReader.ReadToEnd();
				maps = JsonConvert.DeserializeObject<MapsJson>(mapsData).Maps;
			}
			List<Player> players;
			using (var playerReader = new StreamReader(playersPath)) {
				var playersData = playerReader.ReadToEnd();
				players = JsonConvert.DeserializeObject<PlayersJson>(playersData).Players;
			}
			List<string> matchNames;
			using (var matchNamesReader = new StreamReader(matchNamesPath)) {
				var matchNamesData = matchNamesReader.ReadToEnd();
				matchNames = JsonConvert.DeserializeObject<MatchNamesJson>(matchNamesData).Names;
			}

			var random = new Random();
			var matches = matchNames
				.Select(matchName => {
					var map = maps[random.Next(0, maps.Count)];
					var match = new Match(matchName, map);
					var playersCount = random.Next(0, players.Count);
					for (int i = 0; i < playersCount; i++) {
						var playerId = random.Next(0, players.Count);
						var player = players[playerId];
						if (match.Players.Contains(player)) {
							continue;
						}
						players.RemoveAt(playerId);
						match.Players.Add(player);
					}
					return match;
				})
				.ToList();

			return matches;
        }
        struct MapsJson {
            public List<Map> Maps { get; set; }
        }

        struct PlayersJson {
            public List<Player> Players { get; set; }
        }

        struct MatchNamesJson {
            public List<string> Names { get; set; }
        }
    }
}
