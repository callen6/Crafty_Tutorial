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
			// simply start the Game scene to get things going
			Crafty.scene('Game');
  }
}


