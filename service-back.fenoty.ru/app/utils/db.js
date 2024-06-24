import { DB, USER, PASSWORD, HOST, dialect as _dialect, pool as _pool } from "../config/db.config.js";
import Team from "../models/teams.model.js"
import User from "../models/users.model.js"
import Level from "../models/levels.model.js"
import Lobby from "../models/lobby.model.js"
import Rating from "../models/rating.model.js"
import UserLobbies from "../models/userLobbies.model.js"
import DailyReward from "../models/dailyRewards.model.js"
import LevelTasks from "../models/levelTasks.model.js"
import UserTasks from "../models/userTasks.model.js"
import TasksPerLevel from "../models/tasksPerLevel.model.js"
import TasksPermanent from "../models/tasksPermanent.model.js"


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
      logging: false,
      // You can also use an arbitrary function, which can be used to send logs to a logging tool
      // logging: (...msg) => console.log(msg),
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
db.rating = Rating(sequelize, Sequelize)
db.tasksPermanent = TasksPermanent(sequelize, Sequelize)
db.tasksPerLevel = TasksPerLevel(sequelize, Sequelize)
db.userLobbies = UserLobbies(sequelize, Sequelize)
db.dailyReward = DailyReward(sequelize, Sequelize)
db.levelTasks = LevelTasks(sequelize, Sequelize)
db.userTasks = UserTasks(sequelize, Sequelize)

db.user.hasOne(db.rating, {
  foreignKey: 'user_id', sourceKey: 'tg_id'
});

db.rating.belongsTo(db.user, {
  foreignKey: 'user_id', targetKey: 'tg_id'
});

db.user.hasOne(db.team, {
  foreignKey: 'id', sourceKey: 'team_id'
});

db.team.belongsTo(db.user, {
  foreignKey: 'id', targetKey: 'team_id'
});


db.user.hasOne(db.level, {
  foreignKey: 'id', sourceKey: 'level_id'
});

db.level.belongsTo(db.user, {
  foreignKey: 'id', targetKey: 'level_id'
});


db.user.hasMany(db.userLobbies, {
  foreignKey: 'user_id', sourceKey: 'tg_id'
});
db.userLobbies.belongsTo(db.user, {
  foreignKey: 'user_id', targetKey: 'tg_id'
});

db.lobby.hasMany(db.userLobbies, {
  foreignKey: 'lobby_id', sourceKey: 'id'
});
db.userLobbies.belongsTo(db.lobby, {
  foreignKey: 'lobby_id', targetKey: 'id'
});


db.user.hasOne(db.dailyReward, {
  foreignKey: 'id', sourceKey: 'daily_id'
});

db.dailyReward.belongsTo(db.user, {
  foreignKey: 'id', targetKey: 'daily_id'
});


db.user.hasOne(db.userTasks, {
  foreignKey: 'user_id', sourceKey: 'tg_id'
});

db.userTasks.belongsTo(db.user, {
  foreignKey: 'user_id', targetKey: 'tg_id'
});

db.tasksPermanent.hasOne(db.userTasks, {
  foreignKey: 'task_id', sourceKey: 'id'
});

db.userTasks.belongsTo(db.tasksPermanent, {
  foreignKey: 'task_id', targetKey: 'id'
});


db.user.hasOne(db.userTasks, {
  foreignKey: 'user_id', sourceKey: 'tg_id'
});

db.userTasks.belongsTo(db.user, {
  foreignKey: 'user_id', targetKey: 'tg_id'
});

db.tasksPerLevel.hasOne(db.userTasks, {
  foreignKey: 'task_id', sourceKey: 'id'
});

db.userTasks.belongsTo(db.tasksPerLevel, {
  foreignKey: 'task_id', targetKey: 'id'
});


db.level.hasMany(db.levelTasks, {
  foreignKey: 'level_id', sourceKey: 'id'
});

db.levelTasks.belongsTo(db.level, {
  foreignKey: 'level_id', targetKey: 'id'
});

db.tasksPerLevel.hasMany(db.levelTasks, {
  foreignKey: 'task_id', sourceKey: 'id'
});

db.levelTasks.belongsTo(db.tasksPerLevel, {
  foreignKey: 'task_id', targetKey: 'id'
});
export default db;