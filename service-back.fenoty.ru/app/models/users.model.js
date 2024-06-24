export default  (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      tg_id: {
        type: Sequelize.BIGINT,
        unique: true,
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
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      friend_id: {
        type: Sequelize.INTEGER
      },
      friend_reward: {
        type: Sequelize.INTEGER
      },
      level_id: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      team_id: {
        type: Sequelize.INTEGER
      },
      language_code: {
        type: Sequelize.STRING
      },
      daily_id: {
        type: Sequelize.INTEGER
      },
      daily_accepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      last_session: {
        type: Sequelize.DATE
      },
    });
  
    return User;
  };