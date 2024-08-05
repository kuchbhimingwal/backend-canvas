import { WebSocket } from "ws";

export class Game{
  public players: WebSocket[];
  public wordGuesses: Object[];
  public scribbleWords: String[];
  public startTime: Date;
  public playerDrawing: number;
  public randomWord: number;
  public gameDuration: number;
  public time : number;
  public playersGuessing: WebSocket[];
  constructor(players: WebSocket[]){
    this.wordGuesses = [{}];
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
    this.playerDrawing = 0;
    this.randomWord = 0;
    this.gameDuration = 30000;
    this.time = 0;
    this.playersGuessing = [];
    this.startGame();
  }

  startGame(){
    this.wordGuesses = [];
    this.playerDrawing = Math.floor(Math.random() * 4);
    this.randomWord = Math.floor(Math.random() * 50);
      this.time = 30;
      this.playersGuessing = this.players.filter((_, index) => index !== this.playerDrawing);
      this.playersGuessing.map((player,i)=>{
        // console.log(i);
        
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
    }, this.gameDuration);
  }
  guess(playerSocket:WebSocket, guessWord: string){
    this.wordGuesses.push({guessWord, player : `player ${this.players.indexOf(playerSocket)}`});

    this.players.map((player,i)=>{
        player.send(JSON.stringify({
          type: "GUESS",
          payload: {
            guessed: this.wordGuesses
          }
        }))
      if(playerSocket == player){
       if(guessWord == this.scribbleWords[this.randomWord]) {
        this.wordGuesses = [];
        this.players.map((player)=>{
          player.send(JSON.stringify({
            type: "GUESSED",
            payload:{
              message: `player ${i} guess the answere right!!`
            }
          }))
        })
        this.startGame();
        return
       } 
      }
    })
  }
  draw(playerSocket:WebSocket, payload:any){
    if(playerSocket == this.players[this.playerDrawing]){
      // console.log("currrent reccecivede");
      // console.log(payload);
      // console.log("gusseing", this.playersGuessing.length);
      
      
      this.playersGuessing.map((player)=>{
        player.send(JSON.stringify({
          type: "DRAWING_LINES",
          payload
        }))
      })
    } else {
      this.players.map((player)=>{
        console.log("invalid");
        
        player.send(JSON.stringify({
          type: "DRAWING_LINES",
          payload: {
            message: "not allowed"
          }
        }))
      })
    }
  }
}