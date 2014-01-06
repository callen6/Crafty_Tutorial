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
// an Actor is an entity that is drawn in 2D on canvas via
// our logical coordinate grid
Crafty.c('Actor', {
	init: function() {
		this.requires('2D, Canvas, Grid');
	},
});
// a Tree is just an Actor with a certain sprite
Crafty.c('Tree', {
	init: function () {
		this.requires('Actor, Solid, spr_tree');
		},
});

Crafty.c('Bush', {
	init: function() {
		this.requires('Actor, Solid, spr_bush');
	},
});




// this is the player-controlled character
	Crafty.c('PlayerCharacter', {
		init: function() {
			this.requires('Actor, Fourway, Collision, spr_player, SpriteAnimation')
				.fourway(4)
				.stopOnSolids()
				 // Whenever the PC touches a village, respond to the event
      	.onHit('Village', this.visitVillage)
      	// on the next four lines define our four animations
      	// each call to .animate specifies:
      	// the name of the animation
      	// the x and y coordinates within the sprite map at which the animation set begins
      	// the number of animation frames in addition to  the first one
      	.animate('PlayerMovingUp', 0,0,2)
      	.animate('PlayerMovingRight', 0,1,2)
      	.animate('PlayerMovingDown', 0,2,2)
      	.animate('PlayerMovingLeft', 0,3,2);

				// watch for a change of direction and switch animations accordingly
				var animation_speed = 8;
				this.bind('NewDirection', function(data){
					if (data.x > 0) {
						this.animate('PlayerMovingRight', animation_speed, -1);
					} else if (data.x < 0) {
						this.animate('PlayerMovingLeft', animation_speed, -1);
					} else if (data.y > 0){
						this.animate('PlayerMovingDown', animation_speed, -1);
					} else if (data.y < 0) {
						this.animate('PlayerMovingUp', animation_speed, -1);
					} else {
						this.stop();
					}
				});

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
			village.visit();
		}
	});

// a village is a tile on the grid that the PC must visit
// in order to win the game
Crafty.c('Village', {
	init: function() {
		this.requires('Actor, spr_village');
	},

	visit: function() {
		this.destroy();
		Crafty.trigger('VillageVisited', this);
	}
});





















