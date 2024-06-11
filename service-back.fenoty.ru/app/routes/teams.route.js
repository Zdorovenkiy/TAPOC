import { getTest, getTeams } from "../controllers/teams.controller.js"

export default function Test(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/test", getTest);
  app.get("/getTeams", getTeams)

}