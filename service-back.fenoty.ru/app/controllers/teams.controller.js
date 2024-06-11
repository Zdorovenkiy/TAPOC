import db from "../utils/db.js";

export function getTest(req, res) {
    try {
        res.status(200).send("WorkTest");
    }
    catch {
      res.status(500).send({ message: 'Not work' });
    };
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