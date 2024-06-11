export default  (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tg_id: {
        type: Sequelize.INTEGER
      },
      tg_username: {
        type: Sequelize.STRING
      },
      tg_name: {
        type: Sequelize.STRING
      },
      tg_surname: {
        type: Sequelize.STRING
      },
      balance: {
        type: Sequelize.INTEGER
      },
      pid: {
        type: Sequelize.INTEGER
      },
      pid_reward: {
        type: Sequelize.INTEGER
      },
      level_id: {
        type: Sequelize.INTEGER
      },
      team_id: {
        type: Sequelize.INTEGER
      },
      language_code: {
        type: Sequelize.STRING
      },
    });
  
    return User;
  };