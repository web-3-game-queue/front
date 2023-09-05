namespace game_queue_front.Model {
    public class Match {
        public string Name { get; set; }
        public Map Map { get; set; }

        private decimal entryFee;
        public decimal EntryFee {
            get => entryFee;
            set => entryFee = validateEntryFee(value);
        }

        public List<Player> Players = new List<Player>();

        public Match(
            string name,
            Map map
        ) {
            Name = name;
            Map = map;
        }

        public override string ToString() {
            return string.Format("{0}: \"{1}\" ({2}/{3})", Name, Map.Name, Players.Count, Map.MaxPlayersCount);
        }

        private static decimal validateEntryFee(decimal entryFee)
            => Math.Max(0, entryFee);
    }
}
