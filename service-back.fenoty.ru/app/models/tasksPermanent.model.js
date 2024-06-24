export default  (sequelize, Sequelize) => {
    const tasksPermanent = sequelize.define("tasks_permanents", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      task_name: {
        type: Sequelize.STRING,
      },
    });
  
    return tasksPermanent;
  };