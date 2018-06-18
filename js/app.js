'use strict';

/* ***** Enemies ***** */
//Enemy class

//Enemies our player must avoid
var Enemy = function(x, y) {
    //Enemy location - determining the enemies initial location,
    //(y is set in the array enemiesPosY and x is set to 0 in a forEach loop)
    this.x = x;
    this.y = y;

    //Enemy speed - determining the enemies speed
    this.speed = Math.floor((Math.random() * 414) + 100);

    //The image/sprite for the enemies, this uses a helper we've provided to easily load images (provided)
    this.sprite = 'images/enemy-bug.png';
};

//Update the enemy's position (required method for game)
    //Move enemy if it is on canvas + check for collision between enemy and player
    //Parameter: dt, a time delta between ticks. You should multiply any movement by the dt parameter,
    //which will ensure the game runs at the same speed for all computers ***
Enemy.prototype.update = function(dt) {
    //Canvas width = 505.
    //If Enemy's off canvas (x = 530, so the entire Enemy makes it off canvas), set location off canvas
    //to the left to make it come on canvas again (x = -150 to create a little delay)
    //Also set new speed for the enemy for variety in the game

    //Accessing modal-collision
    var modalCollision = document.getElementById('modal-collision');

    if(this.x <= 530) {
        this.x += this.speed * dt; //***
    } else {
        this.x = -150;
        this.speed = Math.floor((Math.random() * 414) + 100);
    };

    //If collision, set players location off canvas, display the collision-modal and reset players location
    if  (player.x < this.x + 60
        &&
        player.x + 37 > this.x
        &&
        player.y < this.y + 25
        &&
       player.y + 30 > this.y) {
            player.x = -700;
            player.y = -700;

            modalCollision.style.display = 'block';

            setTimeout(function() {
                modalCollision.style.display = 'none';
                player.resetPlayer();
            }, 1500);
        };
    };

// Draw the enemy on the screen (required method for game)
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/* ***** Player ***** */
//Player class. Requires an update(), render() and a handleInput() method

//The player
var Player = function(x, y) {
    //Player location
    this.x = x;
    this.y = y;

    //The image/sprite for the player
    this.sprite = 'images/char-horn-girl.png';
};

//Update the player (required method for game)
Player.prototype.update = function() {
    this.checkCrossing();
};

//Draw the Player on screen (required method for game)
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
};

//Handle input from keyboard and move the Player
    //'key' is the value provided by eventListener for 'keyup'
    //Moves player left and right by a 100, and up and down by 82
    //If player is at the canvas edge (x = 5 or 405, y = -30 or 380), break
    //out ofswitch and don't move the player
Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':
            if(this.x == 5) {
                break;
            }
            this.x -= 100;
            break;

        case 'up':
            if(this.y == -30) {
                break;
            }
            this.y -= 82;
            break;

        case  'right':
            if(this.x == 405) {
                break;
            }
            this.x += 100;
            break;

        case 'down':
            if(this.y == 380) {
                break;
            }
            this.y += 82;
    };
};

//Reset players location
    //Called when player reaches the water (in checkCrossing()) and
    //when collision occurs (in Enemy.update())
Player.prototype.resetPlayer = function() {
    player.y = 380;
    player.x = 205;
};

//Check if player reached the water
    //Called in Enemy.update()
Player.prototype.checkCrossing = function() {
    //Access modal-crossing
    var modalCrossing = document.getElementById('modal-crossing');
    //Access buttons on modal
    var modalCloseBtn = document.getElementById('btn-close');
    var modalPlayAgainBtn = document.getElementById('btn-play-again');

    //If player reach the water (player.y = 30),
    //display modal-crossing and reset player location (after clicking button or canvas)
    if(this.y == -30) {
        player.x = -1200;
        player.y = -1200;
        modalCrossing.style.display = 'block';

        //If user clicks yes-button, close modal and reset player
        modalPlayAgainBtn.onclick = function () {
            modalCrossing.style.display = 'none';
            player.resetPlayer();
        };

        //If user clicks close-button, close modal and reset player
        modalCloseBtn.onclick = function () {
            modalCrossing.style.display = 'none';
            player.resetPlayer();
        };

        //If user clicks outside modal, close modal and reset player
        window.onclick = function (event) {
            if (event.target == modalCrossing) {
                modalCrossing.style.display = 'none';
                player.resetPlayer();
            };
        };
    };
};

/* ***** ***** ***** ***** ***** ***** ***** ***** */

// Now instantiate your objects.

// Place all enemy objects in an array called allEnemies
var allEnemies = [];

//Array with Y-coordinates for where the enemies will be created
var enemiesPosY = [216, 134, 52];

//Loop that creates an enemy for each element in the array enemyPosY
    //Create an enemy from constructor function Enemy and push it into
    //the array allEnemies
enemiesPosY.forEach(function (posY) {
    var enemy = new Enemy(0, posY);
    allEnemies.push(enemy);
});

//Place the player object in a variable called player
    //Pass players initial location, x and y
var player = new Player(205, 380);

//Listen for key presses and send the keys to your Player.handleInput() method. You don't need to modify this (provided)
document.addEventListener('keyup', function keyInput(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});