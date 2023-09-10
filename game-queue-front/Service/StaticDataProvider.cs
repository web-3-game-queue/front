﻿using game_queue_front.Business;
using Newtonsoft.Json;

namespace game_queue_front.Service {
    public class StaticDataProvider {
        public static StaticDataProvider? Instance;

        public List<Match> Matches;

        public static void InstantiateMatches(
            string mapsPath,
            string playersPath,
            string matchesPath
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
            List<MatchesJson.MatchJson> rawMatches;
            using (var matchNamesReader = new StreamReader(matchesPath)) {
                var matchNamesData = matchNamesReader.ReadToEnd();
                rawMatches = JsonConvert.DeserializeObject<MatchesJson>(matchNamesData).Matches;
            }

            var random = new Random();
            var playersMatchId = players
                .Select(_ => random.Next(0, rawMatches.Count))
                .ToList();

            var matches = rawMatches
                .Select((rawMatch, index) => {
                    var map = maps[rawMatch.MapId];
                    var match = new Match(rawMatch.Id, rawMatch.Name, map);
                    match.Players = playersMatchId
                        .Select((matchId, playerId) => (matchId, playerId))
                        .Where(tuple => tuple.matchId == index)
                        .Select(tuple => players[tuple.playerId])
                        .ToList();
                    match.Id = index;
                    return match;
                })
                .ToList();

            Instance = new StaticDataProvider(matches);
        }

        struct MapsJson {
            public List<Map> Maps { get; set; }
        }

        struct PlayersJson {
            public List<Player> Players { get; set; }
        }

        struct MatchesJson {
            public struct MatchJson {
                public int Id;
                public string Name;
                public int MapId;
            }

            public List<MatchJson> Matches { get; set; }
        }

        private StaticDataProvider(List<Match> matches) {
            Matches = matches;
        }
    }
}
