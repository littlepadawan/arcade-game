# Arcade Game: Frogger
A simple single player game where the goal for the player is to cross the road and reach the water, without colliding with any of the enemies.

## Motivations
This game is the fourth project in the Front End Web Development nanodegree at Udacity. I was given quite a bit of starter code (HTML, CSS and JavaScript) and my task has been to add entities to recreate the classic arcade game Frogger.

## What you need to play the game
The application runs in your browser, so you don't need to install anything or make any settings. Either click this [link](https://littlepadawan.github.io/arcade-game/) or download the repository and open up `index.html` in your browser to start playing.

## How to play the game
You start at the bottom of the screen and you goal is to make it accross the picture to the water. To do this you must avoid colliding with the enemies. The enemies move at varaying speed and if you collide with one of them the game is reset and you have to start over.

Using the arrow keys on your keyboard, you can move the player up, down, left and right. When you reach the water the game is won!

#### Known bugs
In the function `Player.prototype.checkCrossing` in the `app.js` file I didn't really want to reset the players location when the user closes the `crossing-modal` by clicking the close button or just anywhere outside the modal. But I couldn't get the function to run properly without calling `player.resetPlayer()` when closing the modal these ways.
