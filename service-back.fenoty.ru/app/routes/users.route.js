import { 
  setFriendsRewards,
  friendsResetReward,
  setUserBalance, 
  getDailyRewards, 
  getUserTeam, 
  changeUserTeam, 
  setUser, 
  getUser,    
  checkAuth, 
  userDailyReward, 
  userLevelUp, 
  getFriends,   
  getLevelLimit,  
  getFriendStat,
  checkTelegramSubscription,
  getLevelTasks,
  changeTaskStatus,
  getPermanentTasks
} from "../controllers/users.controller.js"
import { verifyLevelScore } from "../middleware/verifyLevelScore.js"

export default function Users(app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    ); 
    next(); 
  });    
                           
                               
  app.get("/api/v1/getUserTeam", getUserTeam)
  app.get("/api/v1/getUser", getUser)
  app.get("/api/v1/getDailyRewards", getDailyRewards)
  app.get("/api/v1/getLevelLimit", getLevelLimit)
  app.get("/api/v1/getFriendStat", getFriendStat)
  app.get("/api/v1/getLevelTasks", getLevelTasks)
  app.get("/api/v1/getPermanentTasks", getPermanentTasks)
  
  app.post("/api/v1/getFriends", getFriends)
  app.post("/api/v1/friendsResetReward",friendsResetReward)
  app.post("/api/v1/setUserBalance",setUserBalance)
  app.post("/api/v1/userLevelUp",[verifyLevelScore], userLevelUp)
  app.post("/api/v1/checkAuth", checkAuth)
  app.post("/api/v1/setUser", setUser)
  app.post("/api/v1/changeUserTeam", changeUserTeam)
  app.post("/api/v1/userDailyReward", userDailyReward)
  app.post("/api/v1/setFriendsRewards", setFriendsRewards)
  app.post("/api/v1/checkTelegramSubscription", checkTelegramSubscription)
  app.post("/api/v1/changeTaskStatus", changeTaskStatus)
}  