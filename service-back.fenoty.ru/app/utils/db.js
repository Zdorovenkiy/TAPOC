import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from "../config/db.config.js";
import Team from "../models/teams.model.js"
import User from "../models/users.model.js"
import Level from "../models/levels.model.js"
import Lobby from "../models/lobby.model.js"

import Sequelize from "sequelize";

const sequelize = new Sequelize(
    DB,
    USER,
    PASSWORD,
    {
      host: HOST,
      dialect: _dialect,
      define: {
        timestamps: false
      }, 
      pool: {
        max: _pool.max,
        min: _pool.min,
        acquire: _pool.acquire,
        idle: _pool.idle
      },
      logging: false
    },
);

try {
  await sequelize.authenticate();
  console.log('Соединение с БД было успешно установлено');
} catch (e) {
  console.log(
      'Невозможно выполнить подключение к БД: ',
      e
  );
}

const db = {};

db.sequelize = sequelize;
db.team = Team(sequelize, Sequelize)
db.user = User(sequelize, Sequelize)
db.level = Level(sequelize, Sequelize)
db.lobby = Lobby(sequelize, Sequelize)



db.user.hasOne(db.team, {
  foreignKey: 'id', targetKey: 'team_id'
});

db.team.belongsTo(db.user, {
  foreignKey: 'id', targetKey: 'team_id'
});

db.user.hasOne(db.level, {
  foreignKey: 'id', targetKey: 'level_id'
});

db.level.belongsTo(db.user, {
  foreignKey: 'id', targetKey: 'level_id'
});

// db.user.hasOne(db.lobby, {
//   foreignKey: 'id', targetKey: 'team_id'
// });

// db.lobby.belongsTo(db.user, {
//   foreignKey: 'id', targetKey: 'team_id'
// });



export default db;