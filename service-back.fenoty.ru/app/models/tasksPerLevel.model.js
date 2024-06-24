export default  (sequelize, Sequelize) => {
    const TasksPerLevel = sequelize.define("tasks_per_levels", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      task_name: {
        type: Sequelize.STRING,
      },
    });
  
    return TasksPerLevel;
  };