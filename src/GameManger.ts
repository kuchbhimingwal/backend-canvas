import { WebSocket } from "ws";
export class GameManager {
  private games: Game[];
  private pendingUsers: WebSocket[];
  private users: WebSocket[];

  constructor(){
    this.games = [];
    this.pendingUsers = [];
    this.users = [];
  }

  addUsers(socket: WebSocket){
    this.users.push(socket);
    this.handlUser(socket)
  }

  private handlUser(socket: WebSocket){
    socket.on("message" , (data)=>{
      const message = JSON.parse(data.toString());

      if(message.type == "INIT_GAME"){
        if(this.pendingUsers.length >= 5){
          const game = new Game(this.pendingUsers);
          this.games.push(game);
          this.pendingUsers = [];
        } else {
          this.pendingUsers.push(socket)
        }
      }
      if (message.type === "MOVE"){
        
        console.log("inside move")
          const game = this.games.find(game => game.player1 === socket || game.player2 === socket|| game.player3 === socket|| game.player4 === socket|| game.player5 === socket);
          if (game) {
              console.log("inside makemove")
              game.makeMove(socket, message.payload.move);
          }
      }
    })
  }
}