namespace game_queue_front.Business {
    public class MapService {
        public IEnumerable<Map> FilterMapsByName(IEnumerable<Map> maps, string name) =>
            maps.Where(x => x.Name.Contains(name));

        public IEnumerable<Map> FilterMapsByMaxPrice(IEnumerable<Map> maps, decimal maxPrice) =>
            maps.Where(x => x.EntryPrice <= maxPrice);

        public IEnumerable<Map> FilterMapsByNameAndMaxPrice(IEnumerable<Map> maps, string? name, decimal? maxPrice) {
            var result = maps;
            if (name is string nameValue) {
                result = FilterMapsByName(result, nameValue);
            }
            if (maxPrice is decimal maxPriceValue) {
                result = FilterMapsByMaxPrice(result, maxPriceValue);
            }
            return result;
        }
    }
}
