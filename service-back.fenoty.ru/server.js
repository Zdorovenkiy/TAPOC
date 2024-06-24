import express, { json, urlencoded } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import db from "./app/utils/db.js"
import Team from "./app/routes/teams.route.js"
import User from "./app/routes/users.route.js"
import Lobby from "./app/routes/lobby.route.js"

import { updateUserStat, getRatingsByTeam, getRatingFromAllTeams, getUserRating, updateAfterGameStat } from "./app/controllers/wss.controller.js"

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: function (origin, callback) {
    const allowedIps = [
      "http://5.35.94.23:5173",
      "http://5.35.94.23:5174",
      "https://service-front.fenoty.ru",
      "https://www.service-front.fenoty.ru"
      ]; // замените на разрешенные IP-адреса
      if (!origin || allowedIps.includes(origin)) {
        callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
          }
          },
          methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
          credentials: true,
          optionsSuccessStatus: 204,
          };
          
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(urlencoded({ extended: true }));

db.sequelize.sync()

Team(app);
User(app);
Lobby(app);

const PORT = process.env.EXPRESS_PORT || 9090;

const io = new Server(server, {
  path: "/wss/",
  cors: {
  //  origin: "http://5.35.94.23:5173",
   origin: "https://service-front.fenoty.ru",
    
    methods: ["GET", "POST"],
    allowRequest: (req, cb) => {
      // const isAllowed = req.headers.origin === "http://5.35.94.23:5173";
      const isAllowed = req.headers.origin === "https://service-front.fenoty.ru";
      cb(null, isAllowed);
    }   
  } 
});

// io.on("connect", socket => {
//   console.log("socket connected");
// }) 
io.on('connect', (socket) => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
  socket.on('rating', async (msg, callback) => {
    console.log(msg);
    var result = {};
    switch (msg.type) {
      case "updateStat":
        updateUserStat(msg.data, socket);
        break;
      case "updateAfterGameStat":
        updateAfterGameStat(msg.data, socket);
        break;
      case "getRatingsByTeam":
        if (msg.data) {
          result = await getRatingsByTeam(msg.data, socket);
          // console.log(result);
          callback({ 
            status: 'ok', 
            data: result 
          });   
        }
        break; 
      case "getUserRating": 
      try {
        result = await getUserRating(msg.data, socket);
        callback({
          status: 'ok',
          data: result 
        }); 
      } catch (e) {
        console.log("getUserRating", e);
        socket.emit('error');
      }
        break;
      case "getRatingFromAllTeams":
        result = await getRatingFromAllTeams(socket);
        console.log(result);
        callback({ 
          status: 'ok', 
          data: result 
        });  
        break;
      default:
          break;

    
  }

  });
});

// io.on('my message', (msg) => {
//   console.log('message: ' + msg);
// });
// io.on('statisticChange', (msg) => {
//   // io.emit('chat message', msg);
//   console.log(msg);
// });


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});