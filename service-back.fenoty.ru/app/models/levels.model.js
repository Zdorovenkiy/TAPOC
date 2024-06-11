export default  (sequelize, Sequelize) => {
    const Level = sequelize.define("levels", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      limits: {
        type: Sequelize.INTEGER
      },
      task_id: {
        type: Sequelize.INTEGER
      },
    });
  
    return Level;
  };