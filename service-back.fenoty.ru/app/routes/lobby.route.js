import { getLobbies, setLobby, searchExistLobby, addUserToLobby, getWinnersReward, getLobbyStat, checkConnectionSpeed } from "../controllers/lobby.controller.js"

export default function Lobby(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/v1/setLobby", setLobby);
  app.post("/api/v1/addUserToLobby", addUserToLobby);
  app.post("/api/v1/getLobbies", getLobbies);

  app.get("/api/v1/getLobbyStat", getLobbyStat);
  app.get("/api/v1/searchExistLobby", searchExistLobby);
  app.get("/api/v1/getWinnersReward", getWinnersReward);
  app.get("/api/v1/checkConnectionSpeed", checkConnectionSpeed);
}