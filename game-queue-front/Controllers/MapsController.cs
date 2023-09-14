﻿using game_queue_front.Business;
using game_queue_front.Business.Maps;
using Microsoft.AspNetCore.Mvc;

namespace game_queue_front.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class MapsController: ControllerBase {
        private readonly MapService mapService;

        public MapsController(
            MapService mapService
        ) {
            this.mapService = mapService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Map>>> Get(string filterName = "", decimal maxPrice = decimal.MaxValue)
            => await mapService
                .GetMapsFilteredByNameAndMaxPrice(filterName, maxPrice);
    }
}