export default  (sequelize, Sequelize) => {
    const Lobby = sequelize.define("lobbies", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_user: {
        type: Sequelize.BIGINT
      },
      second_user: {
        type: Sequelize.BIGINT
      },
      first_score: {
        type: Sequelize.INTEGER
      },
      second_score: {
        type: Sequelize.INTEGER
      },
      winner_id: {
        type: Sequelize.BIGINT
      },
      reward_accepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      second_reward_accepted: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      }
    });
  
    return Lobby;
  };