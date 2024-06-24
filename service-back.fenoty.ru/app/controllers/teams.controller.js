import db from "../utils/db.js";

export function getTest(req, res) {
//   const user = db.user;
//   const level = db.level;
//   console.log(data);
//   console.log(data.winnerId);
//   if (!data.winnerId) {
//       console.log(data.winnerId);
//       user.findAll({
//           where: {
//               [Op.or]: [{
//                   tg_id: data.firstPlayer,
//                   tg_id: data.secondPlayer,
//               }],                
//           },
//       }).then(players => {
//           console.log(players);
//       })
//   } 
  }

export function getTeams(req, res) {
    try {
      const team = db.team;
       
      team.findAll().then(item => {
        res.status(200).send(item);
      })
    } catch (e) {
      res.status(500).send({ message: e });
    }
  }