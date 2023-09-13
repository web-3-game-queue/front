namespace game_queue_front.Business {
	public class MatchService {
		public IEnumerable<Match> FilterMatchesByMapName(IEnumerable<Match> matches, string name) =>
			matches.Where(x => x.Map.Name.Contains(name));

		public IEnumerable<Match> FilterMatchesByMaxPrice(IEnumerable<Match> matches, decimal maxPrice) =>
			matches.Where(x => x.Map.EntryPrice <= maxPrice);

		public IEnumerable<Match> FilterMatchesByMapNameAndMaxPrice(IEnumerable<Match> matches, string? name, decimal? maxPrice) {
			var result = matches;
			if(name is string nameValue) {
				result = FilterMatchesByMapName(result, nameValue);
			}
			if (maxPrice is decimal maxPriceValue) {
				result = FilterMatchesByMaxPrice(result, maxPriceValue);
			}
			return result;
		}
	}
}
