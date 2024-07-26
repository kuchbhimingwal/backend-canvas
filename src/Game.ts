import { WebSocket } from "ws";

export class Game{
  public players: WebSocket[];
  private scribbleWords: String[];
  private startTime: Date;
  private playerDrawing: number;
  private randomWord: number;
  private gameDuration: number;
  private time : number;
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
    
    this.playerDrawing = Math.floor(Math.random() * 6);
    this.randomWord = Math.floor(Math.random() * 50);
    this.gameDuration  = 30000;
      this.time = 30;
      const playersGuessing = this.players.filter((_, index) => index !== this.playerDrawing);
      playersGuessing.map((player)=>{
        player.send(JSON.stringify({
          type: "GUESSING_PLAYERS",
          payload:{
            message: "you guyes are guessing"
          }}))
      })
      this.players[this.playerDrawing].send(JSON.stringify({
        type: "DRAWING",
        payload:{
          word: this.scribbleWords[this.randomWord]
        }
      }))
  }

  startGame(playerScoket:WebSocket,guess:string){
      const gameLoop = setInterval(() => {
        this.time--;
        this.players.map((player)=>{
          player.send(JSON.stringify({
            type: "TIMER",
            payload:{
              time: this.time
            }
          }))
        })
        // Add game logic here
    }, 1000);
    setTimeout(() => {
      clearInterval(gameLoop);
      this.startGame();
    }, gameDuration);
  }
}