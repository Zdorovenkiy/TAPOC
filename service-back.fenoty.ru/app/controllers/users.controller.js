import db from "../utils/db.js";

const user = db.user;

export function getUserTeam(req, res) {
    try {
      const team = db.team;
       
      team.findOne({
        include: [{
            model: user,
            where: {id: 1}
           }]
      }).then(item => {
        res.status(200).send(item);
      })
    } catch (e) {
      res.status(500).send({ message: e });
    }
  }

  export function getUser(req, res) {
    try {
      user.findOne({
        where: {
          id: req.body.id
        }
      }).then(item => {
        res.status(200).send(item);
      })
    } catch (e) {
      res.status(500).send({ message: e });
    }
  }

  export function changeUserTeam(req, res) {
    try {
      const newTeam = req.body.team_id;
      user.update({team_id: newTeam},{
        where: {
          id: 1
        }
      })
      res.status(200).send("SUCCESS");
      
    } catch (e) {
      res.status(500).send({ message: e });
    }
  }

  export function setUser(req, res) {
    try {
      const newUser = req.body;
      user.create({
        tg_id: newUser.id,
        tg_username: newUser.username,
        tg_name: newUser.first_name,
        tg_surname: newUser.last_name,
        team_id: newUser.team_id,
        language_code: newUser.language_code
      })
      res.status(200).send("SUCCESS");
      
    } catch (e) {
      res.status(500).send({ message: e });
    }
  }