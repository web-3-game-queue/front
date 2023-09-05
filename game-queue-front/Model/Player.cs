namespace game_queue_front.Model {
	public class Player {
		public string Name { get; set; }
		public int Level { get; set; }

		public Player(
			string name,
			int level
		) {
			Name = name;
			Level = level;
		}
	}
}
