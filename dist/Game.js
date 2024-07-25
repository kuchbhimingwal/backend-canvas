"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(players) {
        this.scribbleWords = [
            "apple", "banana", "mountain", "river", "ocean",
            "house", "car", "dog", "cat", "tree",
            "bird", "flower", "cloud", "sun", "moon",
            "star", "boat", "train", "bicycle", "book",
            "chair", "table", "window", "door", "pencil",
            "balloon", "cake", "hat", "shoe", "clock",
            "bridge", "road", "fish", "elephant", "lion",
            "giraffe", "turtle", "butterfly", "rainbow", "fire",
            "ice", "snow", "rain", "wind", "forest",
            "desert", "castle", "dragon", "wizard", "knight"
        ];
        this.players = players;
        this.startTime = new Date();
        players.map((player, i) => {
            player.send(JSON.stringify({
                type: "INIT_GAME",
                payload: {
                    player: `player ${i}`
                }
            }));
        });
        this.startGame();
    }
    startGame() {
        const playerDrawing = Math.floor(Math.random() * 6);
        const randomWord = Math.floor(Math.random() * 50);
        const gameDuration = 30000;
        let time = 30;
        const playersGuessing = this.players.filter((_, index) => index !== playerDrawing);
        playersGuessing.map((player) => {
            player.send(JSON.stringify({
                type: "GUESSING_PLAYERS",
                payload: {
                    message: "you guyes are guyessing"
                }
            }));
        });
        this.players[playerDrawing].send(JSON.stringify({
            type: "DRAWING",
            payload: {
                word: this.scribbleWords[randomWord]
            }
        }));
        const gameLoop = setInterval(() => {
            time--;
            this.players.map((player) => {
                player.send(JSON.stringify({
                    type: "TIMER",
                    payload: {
                        time
                    }
                }));
            });
            // Add game logic here
        }, 1000);
        setTimeout(() => {
            clearInterval(gameLoop);
            this.startGame();
        }, gameDuration);
    }
}
exports.Game = Game;
