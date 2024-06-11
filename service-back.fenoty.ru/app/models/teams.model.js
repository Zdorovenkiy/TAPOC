export default  (sequelize, Sequelize) => {
    const Team = sequelize.define("teams", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      imageBig: {
        type: Sequelize.STRING
      },
      imageSmall: {
        type: Sequelize.STRING
      },
    });
  
    return Team;
  };