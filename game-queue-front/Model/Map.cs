namespace game_queue_front.Model {
	public class Map {
		public int Id { get; set; }
		public string Name { get; set; }
		public int Width { get; set; }
		public int Height { get; set; }
		public int MaxPlayersCount { get; set; }
		public string CoverImageUrl { get; set; }

		public Map(
			int id,
			string name,
			int width,
			int height,
			int maxPlayersCount,
			string coverImageUrl
		) {
			Id = id;
			Name = name;
			Width = width;
			Height = height;
			MaxPlayersCount = maxPlayersCount;
			CoverImageUrl = coverImageUrl;
		}

        public override string ToString() {
			return string.Format("{0} {1}x{2} ({3}p)", Name, Width, Height, MaxPlayersCount);
        }
    }
}
