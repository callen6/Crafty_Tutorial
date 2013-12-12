// Game scene, runs the core gameplay loop
Crafty.scene('Game', function() {
	// this is a 2D array to keep track of all occupied tiles
	this.occupied = new Array(Game.map_grid.width);
	for (var i = 0; i < Game.map_grid.width; i++) {
		this.occupied[i] = new Array(Game.map_grid.height);
		for (var y = 0; y < Game.map_grid.height; y++) {
			this.occupied[i][y] = false;
		}
	}
	// player character, placed at 5,5 on our grid
	this.player = Crafty.e('PlayerCharacter').at(5, 5);
	this.occupied[this.player.at().x][this.player.at().y] = true;
			// place a tree at every edge square on our grid of 16x16 tiles
			// use for loop
			for (var x = 0; x < Game.map_grid.width; x++) {
				for (var y = 0; y < Game.map_grid.height; y++) {
					var at_edge = x === 0 || x === Game.map_grid.width -1 || y === 0 || y === Game.map_grid.height -1;

					if (at_edge) {
					// place a tree entity at the current tile
					Crafty.e('Tree').at(x,y);
					this.occupied[x][y] = true;
				} else if (Math.random() < 0.06 && !this.occupied[x][y]) {
					// Place a bush entity at the current tile
					Crafty.e('Bush').at(x,y);
					this.occupied[x][y] = true;
				}
			}
		}
		// generate up to five villages in the map in random locations
		var max_villages = 5;
		for (var x = 0; x < Game.map_grid.width; x++) {
			for (var y = 0; y < Game.map_grid.height; y++) {
				if (Math.random() < 0.02 ) {
					if (Crafty('Village').length < max_villages && !this.occupied[x][y]) {
						Crafty.e('Village').at(x, y);
					}
				}
			}
		}
		// show the victory screen once all villages are visited
		this.show_victory = this.bind('VillageVisited', function() {
			if (!Crafty('Village').length) {
				Crafty.scene('Victory');
			}
		});
	}, function() {
		// remove our event binding from above so we don't
		// end up having multiple redundant event watchers
		//  after multiple restarts of the game
		this.unbind('VillageVisted', this.show_victory);
	});

// Victory scene
// tells the player when they've won and lets them start a new game
// this displays some text in celebration of their victory
// and also gives directions for how to restart the game
Crafty.scene('Victory', function () {
	Crafty.e('2D, DOM, Text')
	.attr({ x:0, y: Game.height()/2-24, w: Game.width() })
	.css($text_css)
	.text('Victory! Press any key to play again.');
	// watch for the player to press a key, then restart the game
	// when any key is pressed
	this.restart_game = this.bind('KeyDown', function() {
		Crafty.scene('Game');
	});
	// remove that event binding from above so we avoid multiple
	//  redundant event watchers after restarting game many times
}, function() {
	this.unbind('KeyDown', this.restart_game);
});

// Loading scene
// this handles the loading of binary assets like images and audio
Crafty.scene('Loading', function(){
	// draw some text for the player to see in case the file takes
	// a noticeable amount of time to load (sprites, audio, etc)
	Crafty.e('2D, DOM, Text')
	.text("Get ready...it's loading...")
	.attr({ x:0, y: Game.height()/2-24, w: Game.width() })
	.css($text_css)
	// load our sprite map image
	Crafty.load(['assets/16x16_forest_1.gif'], function() {
		// once the image is loaded
		// define the individual sprites in the image
		// each one (spr_tree, etc.) becomes a component
		// these components' names are prefixed with "spr_"
		// to remind us that they simply cause the entity
		// to be drawn with a certain sprite
		Crafty.sprite(16, 'assets/16x16_forest_1.gif', {
			spr_tree: [0,0],
			spr_bush: [1,0],
			spr_village: [0,1],
			spr_player: [1,1]
		});
	// now that our sprites are ready to draw, start the game
	Crafty.scene('Game');
	})
});















