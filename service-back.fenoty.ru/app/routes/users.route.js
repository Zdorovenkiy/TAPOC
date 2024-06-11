import { getUserTeam, changeUserTeam, setUser, getUser  } from "../controllers/users.controller.js"

export default function Test(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/getUserTeam", getUserTeam)
  app.get("/getUser", getUser)

  app.post("/setUser", setUser)
  app.post("/changeUserTeam", changeUserTeam)

}