export default  (sequelize, Sequelize) => {
    const Lobby = sequelize.define("lobby", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: Sequelize.INTEGER
      },
      second_name: {
        type: Sequelize.INTEGER
      },
      first_score: {
        type: Sequelize.INTEGER
      },
      second_score: {
        type: Sequelize.INTEGER
      },
      winner_id: {
        type: Sequelize.INTEGER
      },
    });
  
    return Lobby;
  };