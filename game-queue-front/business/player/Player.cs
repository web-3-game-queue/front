namespace game_queue_front.Business {
    public class Player {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Level { get; set; }

        public Player(
            string name,
            int level
        ) {
            Name = name;
            Level = level;
        }

        public override string ToString() {
            return string.Format("'{0}' {1}lvl", Name, Level);
        }
    }
}
