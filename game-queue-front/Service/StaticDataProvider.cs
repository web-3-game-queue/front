using game_queue_front.Business;
using Newtonsoft.Json;

namespace game_queue_front.Service {
    public class StaticDataProvider {
        public static StaticDataProvider? Instance;

        public List<Map> Maps = new List<Map>();

        public static void InstantiateMatches(
            string mapsPath
        ) {
            List<Map> maps;
            using (var mapReader = new StreamReader(mapsPath)) {
                var mapsData = mapReader.ReadToEnd();
                maps = JsonConvert.DeserializeObject<MapsJson>(mapsData).Maps;
            }

            Instance = new StaticDataProvider(maps);
        }

        struct MapsJson {
            public List<Map> Maps { get; set; }
        }

        private StaticDataProvider(List<Map> maps) {
            Maps = maps;
        }
    }
}
