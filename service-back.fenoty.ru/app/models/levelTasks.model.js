export default  (sequelize, Sequelize) => {
    const LevelTasks = sequelize.define("level_tasks", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      level_id: {
        type: Sequelize.INTEGER
      },
      task_id: {
        type: Sequelize.INTEGER
      },
    },
  );
  
    return LevelTasks;
  };