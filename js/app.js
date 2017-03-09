var TILE_WIDTH = 101, TILE_HEIGHT = 83;

// Enemies our player must avoid
var Enemy = function(N) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 60 * N;
    this.spriteSpeed = Math.random() * (400 - 100) + 100;       // enemy speed initialization

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x > TILE_WIDTH * 5) {              // when enemy crosses the screen its x coordinate is made 0 and with a different sprite speed
        this.x = 0;
        this.spriteSpeed = Math.random() * (400 - 100) + 100;
    }
    this.x = this.x + this.spriteSpeed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = TILE_WIDTH * 2;
    this.y = 95 * 4;

    this.health = 3;        // keeps track of player life
    this.score = 0;         // keeps track of score
    this.highestScore = 0;  // keeps track of highest score
};

Player.prototype.update = function() {
    if(this.y <= 0) {       // this condition is met when player reaches to the river
        this.reset();
        this.score = this.score + 1;
    }
    document.getElementById("score").innerHTML = this.score;            // score updated in UI
    document.getElementById("highest").innerHTML = this.highestScore;   // highest score updated in UI
};

Player.prototype.reset = function() {       // function to reset the position of player
    this.x = TILE_WIDTH * 2;
    this.y = 95 * 4;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(dir) {
    switch(dir){
        case 'left':
            if(this.x > 0)
                this.x = this.x - TILE_WIDTH;
            break;
        case 'right':
            if(this.x < TILE_WIDTH * 4)
                this.x = this.x + TILE_WIDTH;
            break;
        case 'up':
            if(this.y > 0)
                this.y = this.y - TILE_HEIGHT;
            break;
        case 'down':
            if(this.y < 95 * 4)
                this.y = this.y + TILE_HEIGHT;
            break;
    }
};

Player.prototype.removeHeart = function() {     // remove 1 heart when player collides with enemy
    var parent = document.getElementById('scopeDiv');
    var img = document.getElementById('heart' + this.health);
    parent.removeChild(img);
};

var player = new Player();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(1), new Enemy(2.4), new Enemy(3.8)];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
