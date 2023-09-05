namespace game_queue_front.Model {
	public class Map {
		public string Name { get; set; }
		public int Width { get; set; }
		public int Height { get; set; }
		public int MaxPlayersCount { get; set; }
		public string CoverImageUrl { get; set; }

		public Map(
			string name,
			int width,
			int height,
			int maxPlayersCount,
			string coverImageUrl
		) {
			Name = name;
			Width = width;
			Height = height;
			MaxPlayersCount = maxPlayersCount;
			CoverImageUrl = coverImageUrl;
		}
	}
}
