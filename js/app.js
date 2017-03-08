// Enemies our player must avoid
var Enemy = function(N) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = 0;
    this.y = 60 * N;
    this.spriteSpeed = Math.random() * (400 - 100) + 100;

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
    if(this.x > 505) {
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
    this.x = 101 * 2;
    this.y = 95 * 4;

    this.health = 3;
    this.score = 0;
    this.highestScore = 0;
}

Player.prototype.update = function() {
    if(this.y <= 0) {
        this.reset();
        this.score = this.score + 1;
    }
    document.getElementById("score").innerHTML = this.score;
    document.getElementById("highest").innerHTML = this.highestScore;
}

Player.prototype.reset = function() {
    this.x = 101 * 2;
    this.y = 95 * 4;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(dir) {
    switch(dir){
        case 'left':
            if(this.x > 0)
                this.x = this.x - 101;
            break;
        case 'right':
            if(this.x < 404)
                this.x = this.x + 101;
            break;
        case 'up':
            if(this.y > 0)
                this.y = this.y - 83;
            break;
        case 'down':
            if(this.y < 95 * 4)
                this.y = this.y + 83;
            break;
    }
}

Player.prototype.removeHeart = function() {
    var img = document.getElementById('heart' + this.health);
    document.body.removeChild(img);
}

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
