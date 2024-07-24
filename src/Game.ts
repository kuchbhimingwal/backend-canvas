import { WebSocket } from "ws";

export class Game{
  public player1 : WebSocket;
  public player2 : WebSocket;
  public player3 : WebSocket;
  public player4 : WebSocket;
  public player5 : WebSocket;
  private startTime: Date;

  constructor(players: WebSocket[]){
    this.player1 = players[0]
    this.player2 = players[1]
    this.player3 = players[2]
    this.player4 = players[3]
    this.player5 = players[4]
    this.startTime = new Date();
    this.player1.send(JSON.stringify({
      type: "INIT_GAME",
      payload:{
        player: "player1"
      }
    }))
    this.player2.send(JSON.stringify({
      type: "INIT_GAME",
      payload:{
        player: "player2"
      }
    }))
    this.player3.send(JSON.stringify({
      type: "INIT_GAME",
      payload:{
        player: "player3"
      }
    }))
    this.player4.send(JSON.stringify({
      type: "INIT_GAME",
      payload:{
        player: "player4"
      }
    }))
    this.player5.send(JSON.stringify({
      type: "INIT_GAME",
      payload:{
        player: "player5"
      }
    }))
  }
}