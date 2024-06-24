import { reactive } from "vue";
import { io, Socket } from "socket.io-client";
import type { DefaultEventsMap } from "@socket.io/component-emitter";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: []
});

const URL = "https://service-back.fenoty.ru";
// const URL = import.meta.env.VITE_BACKEND_URL;

console.log(URL);


export const socket = io(URL, {
  path: "/wss/"
});


// socket.on("connection", (socket) => {

//   socket.on("rating", (arg: any) => {
//     console.log(arg); 
    
//   });
 
// });



socket.on("connect", () => {
  state.connected = true;
  console.log('connected');
  
});

socket.on("disconnect", () => {
  state.connected = false;
  console.log('disconected');
});

socket.on("error", () => {
  console.log('error');
});


// socket.on("rating", (arg) => {
//   console.log(arg);
// });

// socket.on("getRatingsByTeam", (arg) => {
//   console.log(arg);
// });

// socket.on("getUserRating", (arg) => {
//   console.log(arg);
// });

// socket.on("getRatingFromAllTeams", (arg) => {
//   console.log(arg);
// });

// class SocketioService {
//   socket: Socket<DefaultEventsMap, DefaultEventsMap>;
//   constructor() {}

//   setupSocketConnection() {
//     this.socket = io(URL, {
//         path: "/wss/"
//       });

//     this.socket.emit('mymessage', 'Hello there from Vue.');
//   }

  // this.socket.on('my broadcast', (data) => {
  //   console.log(data);
  // });

  // setupSocket() {  
  //   this.socket.emit('my message', 'Hello there from Vue.');
  // }
// }

// export default new SocketioService();