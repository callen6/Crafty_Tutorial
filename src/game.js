Game = {
	// this defines our grid's size and the size of each of its tiles
	map_grid: {
		width: 24,
		height: 16,
		tile: {
			width: 16,
			height: 16
		}
	},
	// define the total width of the game screen
	// since our grid takes up the entire screen
	// this is just the width of a tile times the width of the grid
	width: function () {
		return this.map_grid.width * this.map_grid.tile.width;
	},
	// define the total height of the game screen
	// since our screen takes up the entire screen
	// this is just the height of a tile times the height of the grid
	height: function () {
		return this.map_grid.height * this.map_grid.tile.height;
	},
	// initialize and start game
	start: function() {
		// start crafty and set a background color so we see its working
		Crafty.init(Game.width(), Game.height());
		Crafty.background('rgb(249, 223, 125');
	// place a tree at every edge square on our grid of 16x16 tiles
	// use for loop
	for (var x = 0; x < Game.map_grid.width; x++) {
		for (var y = 0; y < Game.map_grid.height; y++) {
			var at_edge = x === 0 || x === Game.map_grid.width -1 || y === 0 || y === Game.map_grid.height -1;

			if (at_edge) {
				// place a tree entity at the current tile
				Crafty.e('2D, Canvas, Color')
				.attr({
					x: x * Game.map_grid.tile.width,
					y: y * Game.map_grid.tile.height,
					w: Game.map_grid.tile.width,
					h: Game.map_grid.tile.height
				})
				.color('rgb(20, 125, 40');
			} else if (Math.random() < 0.06) {
				// Place a bush entity at the current tile
				Crafty.e('2D, Canvas, Color')
				.attr({
					x: x * Game.map_grid.tile.width,
					y: y * Game.map_grid.tile.height,
					w: Game.map_grid.tile.width,
					h: Game.map_grid.tile.height
				})
				.color('rgb(20, 185, 40)');
			}
		}
	}
}
}