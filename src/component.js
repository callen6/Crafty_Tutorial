// the grid component allows an element to be located
// on a grid of tiles

Crafty.c('Grid', {
	init: function () {
		this.attr({
			w: Game.map_grid.tile.width,
			h: Game.map_grid.tile.height
		})
	},
	// locate this entity at the given position on the grid
	at: function(x,y) {
		if (x=== undefined && y === undefined) {
			return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height }
		} else {
			this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height});
			return this;
		}
	}
});

Crafty.c('Actor', {
	init: function() {
		this.requires('2D, Canvas, Grid');
	},
});

Crafty.c('Tree', {
	init: function () {
		this.requires('Actor, Color, Solid')
			.color('rgb(20, 125, 40');
		},
});

Crafty.c('Bush', {
	init: function() {
		this.requires('Actor, Color, Solid')
		 .color('rgb(20, 185, 40');
	},
});




// this is the player-controlled character
	Crafty.c('PlayerCharacter', {
		init: function() {
			this.requires('Actor, Fourway, Color, Collision')
				.fourway(4)
				.color('rgb(20, 75, 40')
				.stopOnSolids()
				 // Whenever the PC touches a village, respond to the event
      	.onHit('Village', this.visitVillage);
		},
// this registers a stop-movement function to be called
//  when this entity hits an entity with the "solid" component
		stopOnSolids: function() {
			this.onHit('Solid', this.stopMovement);
			return this;
		},
		// stops the movement
		stopMovement: function() {
			this.speed = 0;
			if (this._movement) {
				this.x -= this._movement.x;
				this.y -= this._movement.y;
			}
		},
		// respond to this player visiting a village
		visitVillage: function(data) {
			village = data[0].obj;
			village.collect();
		}
	});

// a village is a tile on the grid that the PC must visit
// in order to win the game
Crafty.c('Village', {
	init: function() {
		this.requires('Actor, Color')
			.color('rgb(170, 125, 40');
	},

	collect: function() {
		this.destroy();
		Crafty.trigger('VillageVisited', this);
	}
});





















