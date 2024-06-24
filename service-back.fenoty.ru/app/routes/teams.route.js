import {  getTeams } from "../controllers/teams.controller.js"
import { getTest } from "../controllers/lobby.controller.js"

export default function Teams(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/v1/getTest", getTest);
  app.get("/api/v1/getTeams", getTeams)

}