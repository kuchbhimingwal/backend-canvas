import { WebSocket } from "ws";

export class Game{
  public players: WebSocket[];
  private scribbleWords: String[];
  private startTime: Date;

  constructor(players: WebSocket[]){
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
    players.map((player,i)=>{
    player.send(JSON.stringify({
        type: "INIT_GAME",
        payload:{
          player: `player ${i}`
        }
      }))
    })
  }

  private startGame(){
    const palyerDrawing = Math.floor(Math.random() * 6);
    const randomWord = Math.floor(Math.random() * 50);
    const gameDuration  = 30000;
    private gameOver() {
      
      console.log("Game over!");
      // Reset the game (restart the function)
      this.startGame();
    }

  }
}