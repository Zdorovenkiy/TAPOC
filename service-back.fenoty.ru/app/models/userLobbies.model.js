export default  (sequelize, Sequelize) => {
    const UserLobbies = sequelize.define("user_lobbies", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.BIGINT
      },
      lobby_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
    },
  );
  
    return UserLobbies;
  };