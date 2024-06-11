import express, { json, urlencoded } from "express";
import cors from "cors";

import db from "./app/utils/db.js"
import Team from "./app/routes/teams.route.js"
import User from "./app/routes/users.route.js"
// import Level from "./app/routes/levels.route.js"
// import Lobby from "./app/routes/lobby.route.js"
const app = express();


const corsOptions = {
  origin: function (origin, callback) {
    // Проверка, что запрос пришел от разрешенного IP-адреса
    const allowedIps = [
      "https://5.35.94.23:5173",
      "https://5.35.94.23:5174",
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
// Level(app);
// Lobby(app);


const PORT = process.env.EXPRESS_PORT || 9090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});